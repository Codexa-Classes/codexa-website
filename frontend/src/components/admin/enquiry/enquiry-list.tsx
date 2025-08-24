"use client";

import { useState, useEffect, useMemo } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, Search, RefreshCw } from 'lucide-react';
import { enquiryService } from '@/lib/services/enquiry/enquiryService';
import { Enquiry, EnquiryFilters, EnquiryStatus, EnquiryPriority } from '@/types/enquiry';
import dayjs from 'dayjs';

const statusColors: Record<EnquiryStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  contacted: 'bg-blue-100 text-blue-800',
  enrolled: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
};

const priorityColors: Record<EnquiryPriority, string> = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-orange-100 text-orange-800',
  high: 'bg-red-100 text-red-800'
};

export function EnquiryList() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState<Enquiry[]>([]);
  const [filters, setFilters] = useState<EnquiryFilters>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [uniqueTechnologies, setUniqueTechnologies] = useState<string[]>([]);
  const [uniqueYears, setUniqueYears] = useState<number[]>([]);

  // Load enquiries and unique values
  useEffect(() => {
    const loadData = () => {
      const allEnquiries = enquiryService.getAllEnquiries();
      setEnquiries(allEnquiries);
      setFilteredEnquiries(allEnquiries);
      setUniqueTechnologies(enquiryService.getUniqueTechnologies());
      setUniqueYears(enquiryService.getUniquePassOutYears());
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Apply filters when filters or search term changes
  useEffect(() => {
    const filtered = enquiryService.filterEnquiries({
      ...filters,
      searchTerm
    });
    setFilteredEnquiries(filtered);
  }, [filters, searchTerm]);

  const handleFilterChange = (key: keyof EnquiryFilters, value: string | number | undefined) => {
    if (value === '') {
      const newFilters = { ...filters };
      delete newFilters[key];
      setFilters(newFilters);
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleStatusChange = (enquiryId: string, newStatus: EnquiryStatus) => {
    const updated = enquiryService.updateEnquiry({ id: enquiryId, status: newStatus });
    if (updated) {
      setEnquiries(prev => prev.map(e => e.id === enquiryId ? updated : e));
    }
  };

  const handlePriorityChange = (enquiryId: string, newPriority: EnquiryPriority) => {
    const updated = enquiryService.updateEnquiry({ id: enquiryId, priority: newPriority });
    if (updated) {
      setEnquiries(prev => prev.map(e => e.id === enquiryId ? updated : e));
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      const allEnquiries = enquiryService.getAllEnquiries();
      setEnquiries(allEnquiries);
      setFilteredEnquiries(allEnquiries);
      setUniqueTechnologies(enquiryService.getUniqueTechnologies());
      setUniqueYears(enquiryService.getUniquePassOutYears());
      setIsLoading(false);
    }, 500);
  };

  const columns = [
    {
      id: 'name',
      header: 'Name',
      cell: ({ row }: { row: { getValue: (key: string) => any; original: Enquiry } }) => (
        <div>
          <div className="font-medium">{row.getValue('name')}</div>
          <div className="text-sm text-muted-foreground">{row.getValue('email')}</div>
        </div>
      )
    },
    {
      id: 'mobile',
      header: 'Mobile',
      cell: ({ row }: { row: { getValue: (key: string) => any; original: Enquiry } }) => (
        <div className="text-sm">{row.getValue('mobile')}</div>
      )
    },
    {
      id: 'technology',
      header: 'Technology',
      cell: ({ row }: { row: { getValue: (key: string) => any; original: Enquiry } }) => (
        <div className="text-sm font-medium">{row.getValue('technology')}</div>
      )
    },
    {
      id: 'passOutYear',
      header: 'Pass Out Year',
      cell: ({ row }: { row: { getValue: (key: string) => any; original: Enquiry } }) => (
        <div className="text-sm">{row.getValue('passOutYear')}</div>
      )
    },
    {
      id: 'status',
      header: 'Status',
      cell: ({ row }: { row: { getValue: (key: string) => any; original: Enquiry } }) => {
        const status = row.getValue('status') as EnquiryStatus;
        return (
          <Select
            value={status}
            onValueChange={(value: EnquiryStatus) => handleStatusChange(row.original.id, value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(statusColors).map((s) => (
                <SelectItem key={s} value={s}>
                  <Badge className={statusColors[s as EnquiryStatus]} variant="secondary">
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </Badge>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }
    },
    {
      id: 'priority',
      header: 'Priority',
      cell: ({ row }: { row: { getValue: (key: string) => any; original: Enquiry } }) => {
        const priority = row.getValue('priority') as EnquiryPriority;
        return (
          <Select
            value={priority}
            onValueChange={(value: EnquiryPriority) => handlePriorityChange(row.original.id, value)}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(priorityColors).map((p) => (
                <SelectItem key={p} value={p}>
                  <Badge className={priorityColors[p as EnquiryPriority]} variant="secondary">
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </Badge>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }
    },
    {
      id: 'createdAt',
      header: 'Submitted',
      cell: ({ row }: { row: { getValue: (key: string) => any; original: Enquiry } }) => (
        <div className="text-sm text-muted-foreground">
          {dayjs(row.getValue('createdAt')).format("DD MMM YYYY")}
        </div>
      )
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredEnquiries.length} of {enquiries.length} enquiries
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span>Pending:</span>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
              {enquiries.filter(e => e.status === 'pending').length}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span>Total:</span>
            <Badge variant="secondary">
              {enquiries.length}
            </Badge>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        data={filteredEnquiries}
        columns={columns}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search enquiries..."
        emptyMessage="No enquiries found matching your criteria."
        useCard={false}
      />
    </div>
  );
}
