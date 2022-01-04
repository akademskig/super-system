import { join } from 'path';
import { Readable } from 'stream';

import {
  of,
  Observable,
  SchedulerLike,
  asapScheduler,
  bindNodeCallback,
} from 'rxjs';
import * as juice from 'juice';
import { omit } from 'lodash';
import { merge } from 'lodash';
import * as consolidate from 'consolidate';
import { mergeMap } from 'rxjs/operators';
import { Inject, Injectable } from '@nestjs/common';
import * as pdf from 'html-pdf';
import { CreateResult, FileInfo } from 'html-pdf';

import {
  PDFOptions,
  ViewOptions,
  PDFModuleOptions,
  PDF as PDFInterface,
} from './pdf.interfaces';
import { PDF_OPTIONS_TOKEN } from './pdf.constants';
import { defaultCreateOptions } from './pdf.default';

@Injectable()
export class PDFService implements PDFInterface {
  constructor(
    @Inject(PDF_OPTIONS_TOKEN)
    private readonly moduleOptions: PDFModuleOptions,
  ) {}

  toFile(
    template: string,
    filename?: string,
    options?: PDFOptions,
    scheduler: SchedulerLike = asapScheduler,
  ): Observable<FileInfo> {
    return this.makeHtmlRender(template, options).pipe(
      mergeMap((html: string) => {
        const create = this.create(html, options);
        return bindNodeCallback<readonly unknown[], any>(
          create.toFile.bind(create),
          scheduler,
        )(filename);
      }),
    );
  }

  toStream(
    template: string,
    options?: PDFOptions,
    scheduler: SchedulerLike = asapScheduler,
  ): Observable<Readable> {
    return this.makeHtmlRender(template, options).pipe(
      mergeMap((html: string) => {
        const create = this.create(html, options);
        return bindNodeCallback<any, any>(
          create.toStream.bind(create),
          scheduler,
        )();
      }),
    );
  }

  toBuffer(
    template: string,
    options?: PDFOptions,
    scheduler: SchedulerLike = asapScheduler,
  ): Observable<Buffer> {
    return this.makeHtmlRender(template, options).pipe(
      mergeMap((html: string) => {
        const create = this.create(html, options);
        return bindNodeCallback<any, any>(
          create.toBuffer.bind(create),
          scheduler,
        )();
      }),
    );
  }

  private create(html: string, options?: PDFOptions): CreateResult {
    return pdf.create(
      html,
      merge(defaultCreateOptions, omit(options, 'locals')),
    );
  }

  private makeHtmlRender(
    template: string,
    options?: PDFOptions,
  ): Observable<string> {
    const path = this.getTemplatePath(template, this.moduleOptions.view);

    return this.generateHtmlFromTemplate(
      path,
      this.moduleOptions.view,
      options?.locals,
    ).pipe(mergeMap((html: string) => of(this.prepareHtmlTemplate(html))));
  }

  private getTemplatePath(template: string, { root }: ViewOptions): string {
    return join(root, template);
  }

  private generateHtmlFromTemplate(
    template: string,
    { engine, engineOptions }: ViewOptions,
    locals?: Record<string, any>,
  ): Observable<string> {
    return bindNodeCallback<any, any>(consolidate[engine], asapScheduler)(
      template,
      Object.assign({}, locals, engineOptions),
    );
  }

  private prepareHtmlTemplate(html: string): string {
    return juice(html, this.moduleOptions.juice);
  }
}
