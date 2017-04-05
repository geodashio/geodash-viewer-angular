/* Angular */
import { NgModule }      from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

/* Components */
import { GeoDashComponentMain }  from './geodash/components/GeoDashComponentMain';
import { GeoDashComponentMap }  from './geodash/components/GeoDashComponentMap';
import { GeoDashComponentMapMap }  from './geodash/components/GeoDashComponentMapMap';
import { GeoDashComponentMapOverlays }  from './geodash/components/GeoDashComponentMapOverlays';
import { GeoDashComponentMapNavbars }  from './geodash/components/GeoDashComponentMapNavbars';

/* Pipes */
import { GeoDashPipeExtract }  from './geodash/pipes/GeoDashPipeExtract';
import { GeoDashPipeTernaryDefined }  from './geodash/pipes/GeoDashPipeTernaryDefined';
import { GeoDashPipeDefaultIfUndefinedOrBlank }  from './geodash/pipes/GeoDashPipeDefaultIfUndefinedOrBlank';
import { GeoDashPipeMarkdownToHTML }  from './geodash/pipes/GeoDashPipeMarkdownToHTML';
import { GeoDashPipeSlugify }  from './geodash/pipes/GeoDashPipeSlugify';
import { GeoDashPipeAppend }  from './geodash/pipes/GeoDashPipeAppend';
import { GeoDashPipePrepend }  from './geodash/pipes/GeoDashPipePrepend';

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
