import { useDispatch, useSelector } from 'react-redux'
import Button from '../../ui/Button'
import { formatCurrency } from '../../utils/helpers'
import { addItem, getQuantityById } from '../cart/cartSlice'
import DeleteItem from '../cart/DeleteItem'
import UpdateItemQuantity from '../cart/UpdateItemQuantity'

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza
  const dispatch = useDispatch()
  const currentQuantity = useSelector(getQuantityById(id))
  const isInCart = currentQuantity > 0

  function handleAddToCart() {
    if (!pizza) return
    const itemObject = {
      pizzaId: id,
      name,
      unitPrice,
      ingredients,
      quantity: 1,
      soldOut,
      imageUrl,
    }
    dispatch(addItem(itemObject))
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'greyscale opacity-70' : ''}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
          {isInCart && (
            <div className="flex items-center justify-between sm:gap-6">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

export default MenuItem
