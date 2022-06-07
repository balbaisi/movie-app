import axios from 'axios';

export class Api {
  static apiKey: string;

  static apiUrl: string;

  static type: any;

  public static data(params: any = {}): string {
    var finalDataString = '?';
    for (let key in params) {
      let value = params[key];
      finalDataString += `${key}=${value}&`;
    }
    finalDataString += 'api_key=' + this.apiKey;
    return finalDataString.endsWith('&')
      ? finalDataString.slice(0, -1)
      : finalDataString;
  }

  public static async get(endPoint: string, params: any = {}): Promise<any> {
    var url = `${this.apiUrl}/${endPoint}${this.data(params)}`;
    return await axios.get<typeof this.type>(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
