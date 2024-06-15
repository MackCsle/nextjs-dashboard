import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';

import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata({ params, searchParams }: any, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()]);
  const currentCustomer = customers.find((customer: any) => customer.id === invoice.customer_id);

  return {
    title: `${currentCustomer?.name} edits`,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([fetchInvoiceById(id), fetchCustomers()]);
  if (!invoice) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
