const toThousand = (value = 0) => {
  const rounded = Math.round(value)
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default toThousand
