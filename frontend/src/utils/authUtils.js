import { logout } from "../modules/auth/store/authSlice";
import { cleanBox } from "../modules/dashboard/components/boxes/store/boxSlice";
import { clean } from "../modules/dashboard/components/payments/store/paymentSlice";
import { cleanDash } from "../modules/dashboard/store/dashSlice";
import { clean as cleanBeneficiary } from '../modules/dashboard/components/user/storage/beneficiarySlice'
import { store } from "../store/store";


export const logoutAndRedirect = () => {
    localStorage.removeItem('authToken');
    store.dispatch(cleanBox())
    store.dispatch(cleanBeneficiary())
    store.dispatch(logout())
    store.dispatch(cleanDash())
    store.dispatch(clean())
}