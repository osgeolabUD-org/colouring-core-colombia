import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import {t} from'i18next';
import { useAuth } from '../auth-context';
import ErrorBox from '../components/error-box';
import { SpinnerIcon } from '../components/icons';
import InfoBox from '../components/info-box';
import SupporterLogos from '../components/supporter-logos';

import { CCConfig } from '../../cc-config';
let config: CCConfig = require('../../cc-config.json')

export const Login: React.FC = () => {
    const {isLoading, login } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState(undefined);

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        setError(undefined);

        login({ username, password }, setError);
    }, [username, password]);

    const msgText = t('Welcome to Colouring') + ' ' + config.cityName + '. ' + t("You're one of the first people to use the site!");
    ;

    return (
        <article>
            <section className="main-col">
                <h1 className="h2">{t("Log in")}</h1>
                <InfoBox msg={msgText}>
                    <br/>{t('Please')} <a href="https://discuss.colouring.london/" >{t('discuss suggestions for improvements')}</a> {t('and')} <a
                        href="https://github.com/colouring-cities/colouring-core/issues">
                    {t('report issues or problems')}</a>.
                </InfoBox>
                <ErrorBox msg={error} />
                <form onSubmit={onSubmit}>
                    <label htmlFor="username">{t('Username*')}</label>
                    <input name="username" id="username"
                        className="form-control" type="text"
                        value={username} onChange={e => setUsername(e.target.value)}
                        placeholder={t("please note the user name you choose will be public")} required
                    />

                    <label htmlFor="password">{t('Password')}</label>
                    <input name="password" id="password"
                        className="form-control"
                        type={showPassword ? 'text' : 'password'}
                        value={password} onChange={e => setPassword(e.target.value)}
                        required
                    />

                    <div className="form-check">
                        <input id="show_password" name="show_password"
                            className="form-check-input" type="checkbox"
                            checked={showPassword}
                            onChange={e => setShowPassword(e.target.checked)}
                        />
                        <label htmlFor="show_password" className="form-check-label">{t('Show password?')}</label>
                    </div>

                    <Link to="/forgotten-password.html">{t('Forgotten password?')}</Link>

                    <div className="buttons-container with-space">
                        <input type="submit" disabled={isLoading} value={t("Log In")} className="btn btn-primary" />
                        {isLoading && <span><SpinnerIcon />{t('Logging in...')}</span>}
                    </div>

                    {t('Would you like to create an account instead?')}

                    <div className="buttons-container with-space">
                        <Link to="sign-up.html" className="btn btn-outline-dark">{t('Sign Up')}</Link>
                    </div>
                </form>
            </section>
            <hr />
            <section className="main-col">
                <SupporterLogos />
            </section>
        </article>
    )

};
