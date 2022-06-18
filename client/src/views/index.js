import { Route, Switch, Redirect } from 'react-router-dom';
import PublicLayout from 'layouts/public-layout';
import AppLayout from 'layouts/app-layout';

export default function Views() {
    return(
        <Switch>
            <Route exact path="/">
                <Redirect to='/p' />
            </Route>
            <Route path='/p'>
                <PublicLayout/>
            </Route>
            <Route path="/cp">
                <AppLayout/>
            </Route>
            <Route path="/*">
                <Redirect to='/p' />
            </Route>
        </Switch>
    )
}