import { Injectable } from '@nestjs/common';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdGenerationResponse } from '@interfaces/IdGenerationResponse';

@Injectable()
export class IdService {
    constructor(private httpService: HttpService) { }

    public async generateId(code: string): Promise<IdGenerationResponse> {
        let config: AxiosRequestConfig = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        return await lastValueFrom(this.httpService.post(process.env.URL_API_ID_GENERATION, { type_code: code }, config).pipe(
            map((axiosResponse: AxiosResponse<IdGenerationResponse>) => {
                return axiosResponse.data;
            })
        ));
    }
}
