/* Angular */
import { NgModule }      from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

/* Components */
import { GeoDashComponentMain }  from 'GeoDashComponentMain';
import { GeoDashComponentMap }  from 'GeoDashComponentMap';
import { GeoDashComponentMapMap }  from 'GeoDashComponentMapMap';
import { GeoDashComponentMapOverlays }  from 'GeoDashComponentMapOverlays';
import { GeoDashComponentMapNavbars }  from 'GeoDashComponentMapNavbars';

/* Pipes */
import { GeoDashPipeExtract }  from 'GeoDashPipeExtract';
import { GeoDashPipeTernaryDefined }  from 'GeoDashPipeTernaryDefined';
import { GeoDashPipeDefaultIfUndefinedOrBlank }  from 'GeoDashPipeDefaultIfUndefinedOrBlank';
import { GeoDashPipeMarkdownToHTML }  from 'GeoDashPipeMarkdownToHTML';
import { GeoDashPipeSlugify }  from 'GeoDashPipeSlugify';
import { GeoDashPipeAppend }  from 'GeoDashPipeAppend';
import { GeoDashPipePrepend }  from 'GeoDashPipePrepend';

@NgModule({
  imports: [ BrowserModule, HttpModule ],
  declarations: [
    GeoDashComponentMain,
    GeoDashComponentMap,
    GeoDashComponentMapMap,
    GeoDashComponentMapOverlays,
    GeoDashComponentMapNavbars,
    GeoDashPipeExtract,
    GeoDashPipeTernaryDefined,
    GeoDashPipeDefaultIfUndefinedOrBlank,
    GeoDashPipeMarkdownToHTML,
    GeoDashPipeSlugify,
    GeoDashPipeAppend,
    GeoDashPipePrepend
  ],
  providers: [ ],
  bootstrap: [ GeoDashComponentMain ]
})
export class AppModule { }
