import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroModule } from '../hero/hero.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HeroModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBpBWxIIj3CtqQlHXwaJSWXwUB28Z0iagc",
      authDomain: "fir-example-e148c.firebaseapp.com",
      projectId: "fir-example-e148c",
      storageBucket: "fir-example-e148c.appspot.com",
      messagingSenderId: "966493007774",
      appId: "1:966493007774:web:61f4b4a53365c11d7cb08f"
    }),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
