import './OrderHistory.scss'
import { getFormatedDate } from "../Utils"
import { useNavigate } from 'react-router-dom'

const OrderHistory = ({ orders }) => {
    const navigate = useNavigate();
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
                        <tr key={pos} onClick={() => navigate(`/order/${documentID}`)}>
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