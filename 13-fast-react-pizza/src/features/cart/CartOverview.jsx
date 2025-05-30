import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTotalItems, getTotalItemsPrice } from './cartSlice'

function CartOverview() {
  const totalItems = useSelector(getTotalItems)
  const totalItemsPrice = useSelector(getTotalItemsPrice)

  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>
          {totalItems} {totalItems === 1 ? 'pizza' : 'pizzas'}
        </span>
        <span>${totalItemsPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  )
}

export default CartOverview
