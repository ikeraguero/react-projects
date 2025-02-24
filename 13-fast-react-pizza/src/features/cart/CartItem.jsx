import { formatCurrency } from '../../utils/helpers'
import DeleteItem from './DeleteItem'
import UpdateItemQuantity from './UpdateItemQuantity'

function CartItem({ item }) {
  const { name, quantity, unitPrice } = item

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="texxt-sm font-bold">{formatCurrency(unitPrice)}</p>
        <UpdateItemQuantity pizzaId={item.id} currentQuantity={quantity} />
        <DeleteItem pizzaId={item.id} />
      </div>
    </li>
  )
}

export default CartItem
