export const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch {
    return "Data desconhecida"
  }
}

export const formatShortDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "short",
    })
  } catch {
    return "N/A"
  }
}
