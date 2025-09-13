"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Search, Filter, Download, Eye, Mail, Phone } from 'lucide-react';
import { firestoreEnquiryService, EnquiryDocument } from '@/lib/services/enquiry/firestoreEnquiryService';
import { useRouter } from 'next/navigation';

export function EnquiryDashboard() {
  const router = useRouter();
  const [enquiries, setEnquiries] = useState<EnquiryDocument[]>([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState<EnquiryDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadEnquiries();
  }, []);

  useEffect(() => {
    filterEnquiries();
  }, [enquiries, searchTerm, statusFilter]);

  const loadEnquiries = async () => {
    try {
      setLoading(true);
      const data = await firestoreEnquiryService.getAllEnquiries();
      setEnquiries(data);
    } catch (err) {
      setError('Failed to load enquiries');
      console.error('Error loading enquiries:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterEnquiries = () => {
    let filtered = enquiries;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(enquiry =>
        enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        enquiry.mobile.includes(searchTerm)
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(enquiry => enquiry.status === statusFilter);
    }

    setFilteredEnquiries(filtered);
  };

  const getStatusBadgeVariant = (status: EnquiryDocument['status']) => {
    switch (status) {
      case 'new':
        return 'default';
      case 'contacted':
        return 'secondary';
      case 'enrolled':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isEnquiryRecent = (timestamp: any) => {
    if (!timestamp) return false;
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffInDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays <= 2; // Show badge only if enquiry is 2 days old or less
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Name', 'Email', 'Mobile', 'Pass Out Year', 'Technology', 'Status', 'Submitted At'],
      ...filteredEnquiries.map(enquiry => [
        enquiry.name,
        enquiry.email,
        enquiry.mobile,
        enquiry.passOutYear.toString(),
        enquiry.technology,
        enquiry.status,
        formatDate(enquiry.timestamp)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enquiries-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleViewEnquiry = (enquiryId: string) => {
    router.push(`/admin/enquiry/${enquiryId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading enquiries...</span>
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto">

      {error && (
        <Alert className="mb-6 border-red-200 bg-red-50">
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{enquiries.length}</div>
            <div className="text-sm text-gray-600">Total Enquiries</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {enquiries.filter(e => e.status === 'new').length}
            </div>
            <div className="text-sm text-gray-600">New Enquiries</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {enquiries.filter(e => e.status === 'contacted').length}
            </div>
            <div className="text-sm text-gray-600">Contacted</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {enquiries.filter(e => e.status === 'enrolled').length}
            </div>
            <div className="text-sm text-gray-600">Enrolled</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, email, or mobile..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="enrolled">Enrolled</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={exportToCSV} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={loadEnquiries} variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enquiries Table */}
      <Card>
        <CardHeader>
          <CardTitle>Enquiries ({filteredEnquiries.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredEnquiries.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No enquiries found matching your criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Pass Out Year</TableHead>
                    <TableHead>Technology</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEnquiries.map((enquiry) => (
                    <TableRow key={enquiry.id}>
                      <TableCell className="font-medium">
                        <div className="space-y-2">
                          <div>{enquiry.name}</div>
                          {isEnquiryRecent(enquiry.timestamp) && (
                            <Badge 
                              variant={getStatusBadgeVariant(enquiry.status)}
                              className="animate-pulse text-white font-semibold text-xs"
                              style={{
                                animation: 'blink 2s infinite',
                                background: enquiry.status === 'new' ? 'linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)' : 
                                            enquiry.status === 'contacted' ? 'linear-gradient(135deg, #3b82f6, #2563eb, #1d4ed8)' :
                                            enquiry.status === 'enrolled' ? 'linear-gradient(135deg, #10b981, #059669, #047857)' :
                                            enquiry.status === 'rejected' ? 'linear-gradient(135deg, #ef4444, #dc2626, #b91c1c)' : 
                                            'linear-gradient(135deg, #6b7280, #4b5563, #374151)'
                              }}
                            >
                              {enquiry.status?.toUpperCase()}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Mail className="h-3 w-3 mr-1" />
                            {enquiry.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-3 w-3 mr-1" />
                            {enquiry.mobile}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{enquiry.passOutYear}</TableCell>
                      <TableCell className="max-w-xs truncate">{enquiry.technology}</TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {formatDate(enquiry.timestamp)}
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewEnquiry(enquiry.id)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
