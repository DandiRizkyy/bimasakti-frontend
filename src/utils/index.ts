export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export function convertToRupiah(amountInRupiah: number): any {
  const formattedAmount = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amountInRupiah).replace(/,00$/, '');
  return formattedAmount
}
