const getNextInvoiceNumber = (invoiceNumber?: string) => {
  try {
    const numbers = invoiceNumber.split('-');
    const first = Number(numbers[0]);
    const nextNumber = (first + 1)
      .toString()
      .concat('-', numbers[1], '-', numbers[2]);
    return nextNumber;
  } catch (error) {
    return '1-1-1';
  }
};
export default getNextInvoiceNumber;
