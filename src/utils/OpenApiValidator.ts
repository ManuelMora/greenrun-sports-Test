import { OpenApiValidator } from 'express-openapi-validate';
import * as fs from 'fs';
import * as path from 'path';

export default class OpenApiValidatorProvider {
    public static getValidator() {
        const openApiSpecificationFile = path.join(
            __dirname,
            '../../static/greenrun-sports-V1-OAS.json'
        );
        const openApiSpecification = fs.readFileSync(
            openApiSpecificationFile,
            'utf-8'
        );
        const openApiDocument = JSON.parse(openApiSpecification);
        return new OpenApiValidator(openApiDocument);
    }
}
