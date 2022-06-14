import CardExpiryLabel from "../components/form/components/CardExpiryLabel"
import InputLabel from "../components/form/components/InputLabel"
import SelectLabel from "../components/form/components/SelectLabel"
import LightBlueButton from "../components/ui/LightBlueButton"
import { getProvincias } from "../Utils"
import './Paymentpage.scss'
import { useState,useEffect } from "react"
import { usePayment } from "../customHooks/usePayment"
import Errordiv from '../components/ui/Errordiv'
import { useDispatch,useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { saveOrderHistory} from '../redux/Orders/orders.actions'
import { createStructuredSelector } from "reselect"
import { selectCartItems, selectCartItemsCount, selectCartTotal } from '../redux/Cart/cart.selectors';

const mapState = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal,
    itemCount: selectCartItemsCount

})

const Paymentpage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems, total, itemCount } = useSelector(mapState)
    const [form, setForm] = useState({
        nombre: "",
        apellidos: "",
        dni: "",
        telefono: "",
        provincia: "",
        cp: "",
        direccion: "",
        tarjeta: "",
        ccv: "",
        expiryMM: "",
        expiryYY: "",
    })
    const { errors, validateForm, onBlurField } = usePayment(form)

    useEffect(() => {
        if (itemCount<1){
            navigate('/account')
        }
    },[itemCount])

    const selectProvinciasOptions = []
    getProvincias.forEach(provincia => {
        selectProvinciasOptions.push({
            value: provincia,
            name: provincia
        })
    })

    const onUpdateField = e => {
        const field = e.target.name;
        const nextFormState = {
            ...form,
            [field]: e.target.value,
        };
        setForm(nextFormState);
        if (errors[field].touched){
            validateForm({
                form: nextFormState,
                errors,
                field,
            })
        }
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const { isValid } = validateForm({form, errors, forceTouchErrors: true});
        if (!isValid) return;
        // TODO server side Payments API
        const configOrder = {
            orderTotal: total,
            orderItems: cartItems.map(item => {
                const { documentID, imageURL, nombre, precio, quantity } = item;
                return {
                    documentID,
                    imageURL,
                    nombre,
                    precio,
                    quantity
                }
            })
        }
        dispatch(saveOrderHistory(configOrder))
    }

    return(
        <div className="paymentpage">
            <div className="paymentwrap">
                <form onSubmit={handleOnSubmit}>
                    <h2 className="headpayment">Datos personales</h2>
                    <div className="insidewrapPayment">
                        <div>
                            <InputLabel label={'Nombre'} inputtype={'text'} inputname={'nombre'} inputvalue={form.nombre} inputonchange={onUpdateField} inputonBlur={onBlurField} errorform={errors.nombre.touched && errors.nombre.error ? true : null}/>
                            {errors.nombre.touched && errors.nombre.error ? (<Errordiv mensaje={errors.nombre.message} />) : null}
                        </div>
                        <div>
                            <InputLabel label={'Apellidos'} inputtype={'text'} inputname={'apellidos'} inputvalue={form.apellidos}inputonchange={onUpdateField} inputonBlur={onBlurField} errorform={errors.apellidos.touched && errors.apellidos.error ? true : null}/>
                            {errors.apellidos.touched && errors.apellidos.error ? (<Errordiv mensaje={errors.apellidos.message} />) : null}
                        </div>
                    </div>
                    <InputLabel label={'DNI'} inputtype={'text'} inputname={'dni'} inputvalue={form.dni} inputonchange={onUpdateField} inputonBlur={onBlurField} errorform={errors.dni.touched && errors.dni.error ? true : null}/>
                    {errors.dni.touched && errors.dni.error ? (<Errordiv mensaje={errors.dni.message} />) : null}
                    <InputLabel label={'Teléfono'} inputtype={'text'} inputname={'telefono'} inputvalue={form.telefono} inputonchange={onUpdateField} inputonBlur={onBlurField} errorform={errors.telefono.touched && errors.telefono.error ? true : null}/>
                    {errors.telefono.touched && errors.telefono.error ? (<Errordiv mensaje={errors.telefono.message} />) : null}
                    <div className="insidewrapPayment">
                        <div>
                           <SelectLabel label={'Provincia'} selectDefault={'Seleccione provincia'} selectOptions={selectProvinciasOptions} selectName={'provincia'} selectValue={form.provincia} selectChange={onUpdateField} selectBlur={onBlurField} errorform={errors.provincia.touched && errors.provincia.error ? true : null}/>
                            {errors.provincia.touched && errors.provincia.error ? (<Errordiv mensaje={errors.provincia.message} />) : null}
                        </div>
                        <div>
                            <InputLabel label={'Código Postal'} inputtype={'text'} inputname={'cp'} inputvalue={form.cp} inputonchange={onUpdateField} inputonBlur={onBlurField} errorform={errors.cp.touched && errors.cp.error ? true : null}/>
                            {errors.cp.touched && errors.cp.error ? (<Errordiv mensaje={errors.cp.message} />) : null}
                        </div>
                    </div>
                    <InputLabel label={'Dirección'} inputtype={'text'} inputname={'direccion'} inputvalue={form.direccion} inputonchange={onUpdateField} inputonBlur={onBlurField} errorform={errors.direccion.touched && errors.direccion.error ? true : null}/>
                    {errors.direccion.touched && errors.direccion.error ? (<Errordiv mensaje={errors.direccion.message} />) : null}
                    <h2 className="headpayment">Tarjeta de crédito</h2>
                    <InputLabel label={'Número de la tarjeta'} inputtype={'number'} inputname={'tarjeta'} inputvalue={form.tarjeta} inputonchange={onUpdateField} inputonBlur={onBlurField} errorform={errors.tarjeta.touched && errors.tarjeta.error ? true : null}/>
                    {errors.tarjeta.touched && errors.tarjeta.error ? (<Errordiv mensaje={errors.tarjeta.message} />) : null}
                    <div className="insidewrapPayment">
                        <div>
                            <InputLabel label={'CCV'} inputtype={'password'} inputname={'ccv'} inputvalue={form.ccv} inputonchange={onUpdateField} inputonBlur={onBlurField} errorform={errors.ccv.touched && errors.ccv.error ? true : null}/>
                            {errors.ccv.touched && errors.ccv.error ? (<Errordiv mensaje={errors.ccv.message} />) : null}
                        </div>
                        <div>
                            <CardExpiryLabel label={'Fecha de caducidad'} inputnameMM={'expiryMM'} inputnameYY={'expiryYY'} inputvalueMM={form.expiryMM} inputvalueYY={form.expiryYY} inputonchange={onUpdateField} inputonBlur={onBlurField} errorform={(errors.expiryMM.touched && errors.expiryMM.error) || (errors.expiryYY.touched && errors.expiryYY.error) ? true : null}/>
                            {(errors.expiryMM.touched && errors.expiryMM.error) || (errors.expiryYY.touched && errors.expiryYY.error) ? (<Errordiv mensaje={errors.expiryMM.message || errors.expiryYY.message} />) : null}
                        </div>
                    </div>
                    <div className="buttonwrap">
                        <LightBlueButton type={'submit'}>Realizar pedido</LightBlueButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Paymentpage
