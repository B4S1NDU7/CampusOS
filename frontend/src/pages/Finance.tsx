import { useState } from 'react';
import { useQuery } from '../hooks/useApi';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { toast } from 'sonner';
import { DollarSign, CreditCard, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Setup Stripe Promise (in a real app, use the actual pub key from env)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_placeholder');

const CheckoutForm = ({ clientSecret, invoiceId, onSuccess }: { clientSecret: string, invoiceId: string, onSuccess: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href, // Or wherever you want to return
      },
      redirect: 'if_required' // For SPA experience
    });

    if (error) {
      toast.error(error.message || 'Payment failed');
    } else {
      toast.success('Payment successful!');
      onSuccess();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <Button type="submit" disabled={!stripe || loading} className="w-full mt-4">
        {loading ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  );
};

export const Finance = () => {
  const { user } = useAuth();
  const [paymentSecret, setPaymentSecret] = useState<string | null>(null);
  const [activeInvoice, setActiveInvoice] = useState<string | null>(null);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  
  const { data, refetch, loading } = useQuery<{ data: any[] }>('finance', '/finance');

  const invoices = data?.data || [];

  const handlePay = async (invoiceId: string) => {
    try {
      const res = await api.post(`/finance/${invoiceId}/payment-intent`);
      setPaymentSecret(res.data.clientSecret);
      setActiveInvoice(invoiceId);
      setIsPayModalOpen(true);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to initialize payment');
    }
  };

  const onPaymentSuccess = () => {
    setIsPayModalOpen(false);
    setPaymentSecret(null);
    refetch(); // Refresh invoice list
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Finance & Billing</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your invoices and payments.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Invoices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-gray-500">Loading...</TableCell>
                  </TableRow>
                ) : invoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-gray-500">No invoices found.</TableCell>
                  </TableRow>
                ) : (
                  invoices.map((inv) => (
                    <TableRow key={inv._id}>
                      <TableCell className="font-medium">{inv.invoiceNumber}</TableCell>
                      <TableCell>{inv.description}</TableCell>
                      <TableCell>${inv.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          inv.status === 'paid' ? 'bg-green-100 text-green-800' :
                          inv.status === 'overdue' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {inv.status.toUpperCase()}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {inv.status !== 'paid' ? (
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-blue-600 border-blue-200 hover:bg-blue-50"
                            onClick={() => handlePay(inv._id)}
                          >
                            <CreditCard className="h-4 w-4 mr-2" />
                            Pay Now
                          </Button>
                        ) : (
                          <span className="inline-flex items-center text-green-600 text-sm font-medium">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Paid
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isPayModalOpen} onOpenChange={setIsPayModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Complete Payment</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {paymentSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret: paymentSecret }}>
                <CheckoutForm clientSecret={paymentSecret} invoiceId={activeInvoice!} onSuccess={onPaymentSuccess} />
              </Elements>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
