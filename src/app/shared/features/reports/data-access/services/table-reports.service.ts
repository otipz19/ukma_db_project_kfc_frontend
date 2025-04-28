import {Injectable} from "@angular/core";
import {jsPDF} from "jspdf";
import {mapEntityToRow} from "../model/map-entity-to-row";
import autoTable from "jspdf-autotable";
import {ColumnsMapper} from "../model/columns-mapper";

@Injectable({
  providedIn: 'root'
})
export class TableReportsService {
  exportReport<TEntity extends object, TColumn extends keyof TEntity>(config: {
    title: string,
    headerColumns: Array<TColumn>,
    headerMapper: Record<TColumn, string>
    entities: Array<TEntity>,
    columnsMapper: ColumnsMapper<TEntity>,
  }) {
    const doc = new jsPDF();
    doc.setFont('Roboto-Regular', 'normal');
    doc.text(config.title, 105, 15, {align: 'center'});
    doc.line(10, 20, 200, 20);
    const header = config.headerColumns.filter(c => c !== 'actions');
    const data = config.entities.map(e => mapEntityToRow(e, header, config.columnsMapper));
    autoTable(doc, {
      startY: 25,
      head: [header.map(h => config.headerMapper[h])],
      //@ts-ignore
      body: data,
      theme: 'grid',
      headStyles: {
        valign: 'bottom',
        halign: 'center'
      },
      styles: {
        overflow: 'linebreak',
        font: 'Roboto-Regular',
        fontStyle: 'normal',
      }
    });
    doc.save(config.title + '.pdf');
  }
}
