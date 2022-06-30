import { Switch, Route } from 'react-router-dom';
import { LOGIN_PREFIX, PUBLIC_PREFIX, ERROR_PREFIX, SIGNUP_PREFIX, PROFILE_PREFIX, PRODUCT_DETAIL_PREFIX, SHIPPING_PREFIX, WAREHOUSE_PREFIX, PARCEL_PREFIX, INTERNATIONAL_PREFIX, AFILLIATE_PREFIX, CHECKOUT_PREFIX, CALCULATOR_PREFIX, SEARCH_PREFIX, MANUAL_PREFIX, BANK_PREFIX, MANUAL_PRODUCT_DETAIL_PREFIX, HISTORY_PREFIX, HISTORYCART_PREFIX, CONFIRM_PREFIX } from 'configs/app-config';
import LoginPage from './login';
import NowFoundPage from './404';
import LandingPage from './landing';
import SignUpPage from './signup';
import ProfilePage from './profile';
import ProductDetailPage from './product-detail';
import ShippingCart from './shipping-cart';
import WareHousePage from './warehouse';
import ParcelPage from './parcel';
import BankPage from './bank';
import InternationalShippingPage from './international-shipping';
import AfilliatePage from './afilliate';
import CheckoutPage from './checkout';
import ShippingCalculator from './shipping-calculator';
import ProductSearch from './product-search';
import ManualProductSubmissionPage from './manual-product-submission';
import ManualProductDetailsPage from './manual-product-detail';
import HistoryPage from './history';
import HistoryCart from './historycart';
import ConfirmCart from './confirm';

export default function PublicPage() {
    return (
        <Switch>
            <Route exact path={PUBLIC_PREFIX} component={LandingPage} />
            <Route exact path={PUBLIC_PREFIX + LOGIN_PREFIX} component={LoginPage} />
            <Route exact path={PUBLIC_PREFIX + SIGNUP_PREFIX} component={SignUpPage} />
            <Route exact path={PUBLIC_PREFIX + PROFILE_PREFIX} component={ProfilePage} />
            <Route path={PUBLIC_PREFIX + PRODUCT_DETAIL_PREFIX} component={ProductDetailPage} />
            <Route path={PUBLIC_PREFIX + MANUAL_PRODUCT_DETAIL_PREFIX} component={ManualProductDetailsPage} />
            <Route exact path={PUBLIC_PREFIX + SHIPPING_PREFIX} component={ShippingCart} />
            <Route exact path={PUBLIC_PREFIX + CONFIRM_PREFIX} component={ConfirmCart} />
            <Route exact path={PUBLIC_PREFIX + WAREHOUSE_PREFIX} component={WareHousePage} />
            <Route exact path={PUBLIC_PREFIX + HISTORY_PREFIX} component={HistoryPage} />
            <Route exact path={PUBLIC_PREFIX + HISTORYCART_PREFIX} component={HistoryCart} />
            <Route exact path={PUBLIC_PREFIX + PARCEL_PREFIX} component={ParcelPage} />
            <Route exact path={PUBLIC_PREFIX + BANK_PREFIX} component={BankPage} />
            <Route exact path={PUBLIC_PREFIX + SHIPPING_PREFIX + INTERNATIONAL_PREFIX} component={InternationalShippingPage} />
            <Route exact path={PUBLIC_PREFIX + PROFILE_PREFIX + AFILLIATE_PREFIX} component={AfilliatePage} />
            <Route exact path={PUBLIC_PREFIX + CHECKOUT_PREFIX} component={CheckoutPage} />
            <Route exact path={PUBLIC_PREFIX + CALCULATOR_PREFIX} component={ShippingCalculator} />
            <Route exact path={PUBLIC_PREFIX + SEARCH_PREFIX} component={ProductSearch} />
            <Route path={PUBLIC_PREFIX + MANUAL_PREFIX} component={ManualProductSubmissionPage} />
            <Route path={PUBLIC_PREFIX + ERROR_PREFIX} component={NowFoundPage} />
        </Switch>
    )
}