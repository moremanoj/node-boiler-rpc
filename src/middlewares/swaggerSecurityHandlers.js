import * as ejwt from 'express-jwt';
import * as jwks from 'jwks-rsa';
// import { config } from '../../config';
import { SecurityError } from './security/securityError';
import { SecurityErrorCode } from './security/securityErrorCode';

export function bearerSecurityHandler(req, authOrSecDef, scopesOrApiKey, next) {
    // if (config.environment === Environment.UnitTest) {
    //     return next();
    // }

    const jwt = ejwt({
        secret: jwks.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: "localhost:3005/rsauri" // config.auth0.jwksUri
        }),
        issuer: config.auth0.jwtIssuer,
        algorithms: ['RS256']
    });

    jwt(req, req.res, function(err) {
        if (req.user === undefined) {
            if (config.environment === Environment.Prod) {
                if (err instanceof ejwt.UnauthorizedError) {
                    return next(new SecurityError(SecurityErrorCode.InvalidAuthToken));
                }
                return next(new SecurityError(SecurityErrorCode.UnknownUser));
            } else {
                return next(err);
            }
        } else {
            // req.identityUser = new IdentityUser(req.user, req.headers.authorization.substring(req.headers.authorization.indexOf('Bearer') + 'Bearer '.length));
            return next();
        }
    });
}

export function guestSecurityHandler(req, authOrSecDef, scopesOrApiKey, next) {
    if (config.environment === Environment.UnitTest) {
        return next();
    }

    if (!req.swagger.params.body.value.clientId) {
        return next(new SecurityError(SecurityErrorCode.UnknownUser));
    }

    const dto = {};
    const clientId = req.swagger.params.body.value.clientId;
    if (clientId) {
        dto[IdentityUserClaim.TnbtClientId] = req.swagger.params.body.value.clientId;
        req.identityUser = new IdentityUser(dto, 'guest');
    }
    return next();
}
