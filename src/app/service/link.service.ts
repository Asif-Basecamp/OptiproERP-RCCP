import {Injectable} from "@angular/core";
import {Link} from "../model/link";
import {HttpClient} from '@angular/common/http';
import {HandleError} from './service-helper';


@Injectable()
export class LinkService {

    get(): Promise<Link[]> {
        return Promise.resolve([
            {id: 1, source: 1, target: 2, type: "0"}
        ]);
    }
    
}
    