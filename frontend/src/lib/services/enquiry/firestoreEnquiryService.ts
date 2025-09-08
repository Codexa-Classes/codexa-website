import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit,
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { CreateEnquiryData } from '@/types/enquiry';

export interface EnquiryDocument {
  id: string;
  name: string;
  mobile: string;
  email: string;
  passOutYear: number;
  technology: string; // Comma-separated string as requested
  timestamp: Timestamp;
  status: 'new' | 'contacted' | 'enrolled' | 'rejected';
}

export class FirestoreEnquiryService {
  private collectionName = 'enquiries';

  async createEnquiry(data: CreateEnquiryData): Promise<EnquiryDocument> {
    try {
      // Convert technology array to comma-separated string
      const technologyString = Array.isArray(data.technology) 
        ? data.technology.join(', ') 
        : data.technology;

      const enquiryData = {
        name: data.name,
        mobile: data.mobile,
        email: data.email,
        passOutYear: data.passOutYear,
        technology: technologyString,
        timestamp: Timestamp.now(),
        status: 'new' as const
      };

      const docRef = await addDoc(collection(db, this.collectionName), enquiryData);
      
      return {
        id: docRef.id,
        ...enquiryData
      };
    } catch (error) {
      console.error('Error creating enquiry:', error);
      throw new Error('Failed to create enquiry');
    }
  }

  async getAllEnquiries(): Promise<EnquiryDocument[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        orderBy('timestamp', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as EnquiryDocument));
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      throw new Error('Failed to fetch enquiries');
    }
  }

  async getEnquiriesByStatus(status: EnquiryDocument['status']): Promise<EnquiryDocument[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('status', '==', status),
        orderBy('timestamp', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as EnquiryDocument));
    } catch (error) {
      console.error('Error fetching enquiries by status:', error);
      throw new Error('Failed to fetch enquiries by status');
    }
  }

  async checkDuplicateEnquiry(email: string, mobile: string): Promise<boolean> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('email', '==', email)
      );
      
      const querySnapshot = await getDocs(q);
      
      // Check if any existing enquiry has the same email or mobile
      return querySnapshot.docs.some(doc => {
        const data = doc.data();
        return data.email === email || data.mobile === mobile;
      });
    } catch (error) {
      console.error('Error checking duplicate enquiry:', error);
      return false; // Allow submission if check fails
    }
  }

  async getRecentEnquiries(limitCount: number = 10): Promise<EnquiryDocument[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as EnquiryDocument));
    } catch (error) {
      console.error('Error fetching recent enquiries:', error);
      throw new Error('Failed to fetch recent enquiries');
    }
  }
}

// Export singleton instance
export const firestoreEnquiryService = new FirestoreEnquiryService();
