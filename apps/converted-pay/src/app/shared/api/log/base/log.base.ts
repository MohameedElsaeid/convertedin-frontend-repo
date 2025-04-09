import { Observable } from "rxjs";

export abstract class LogApi{

    abstract trackEvents(event:string,metadata:any):Observable<object>;

    abstract errorLog(exception:string):Observable<object>
}