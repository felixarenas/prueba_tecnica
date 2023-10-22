
export class GetStatsResponseEntity {
    constructor(
        public jsonData:{
            count_anomalies:number;
            count_no_anomalies:number;
            ratio:string;
        },
    ){}
}