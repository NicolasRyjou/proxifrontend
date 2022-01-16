import { SafeResourceUrl } from "@angular/platform-browser";

export class ChatClass {
    constructor(
        public chatId: number,
        public creatorId: number,
        public chatName: string,
        public coordinates: any,
        public radius: number,
        public isCreatedBySaved: boolean,
        public description?: string,
        public imageBase64?: SafeResourceUrl,
    ) {  }
  
  }
  