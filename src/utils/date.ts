export function formatDate(
  date: string,
) {
  return new Date(date)
    .toLocaleDateString('pt-BR');
}

export function formatDateTime(
  date: string,
) {
  return new Date(date)
    .toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',

      hour: '2-digit',
      minute: '2-digit',
    });
}