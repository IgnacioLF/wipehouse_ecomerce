import './OrderHistory.scss'
import { getFormatedDate } from "../Utils"

const OrderHistory = ({ orders }) => {
    // TODO onclick pedido details
    if (!orders) return
    return(
        <table className="orderHistoryTable">
            <thead>
                <tr>
                    <th>Fecha del pedido</th>
                    <th>ID del pedido</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, pos) => {
                    const { orderCreatedDate, documentID, orderTotal } = order
                    const createdDate = new Date(orderCreatedDate.seconds * 1000 + orderCreatedDate.nanoseconds/1000000)
                    const formatedDate = getFormatedDate(createdDate)
                    return(
                        <tr key={pos}>
                            <td className='firsttd'>{formatedDate}</td>
                            <td>{documentID}</td>
                            <td className='lasttd'>{orderTotal}€</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default OrderHistory