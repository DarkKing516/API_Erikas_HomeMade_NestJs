import { Module } from "@nestjs/common";
import { ImgService } from "@app/firebase/img.service";

@Module({
  providers : [ImgService],
  exports   : [ImgService],
})
export class FirebaseLibModule {}
