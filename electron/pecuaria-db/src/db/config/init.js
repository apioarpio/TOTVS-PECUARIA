import scriptAnimal from './../scripts/createAnimalTable';
import scriptEntidade from './../scripts/createEntidadeTable';
import scriptSyncTable from '../scripts/createSynctable';
import scriptTMTable from '../scripts/createTMTable';
import scriptMovimentacaoTable from '../scripts/createMovimentacaoTable';
import scriptMovimentacaoAnimalTable from '../scripts/createMovimentacaoAnimalTable';
import scriptHistoricoPesoTable from '../scripts/createHistoricoPesoTable';
import scriptContextoTable from '../scripts/createContextoTable';
import scriptContextoFazendaTable from '../scripts/createContextoFazendaTable';
import scriptRacaAnimalTable from '../scripts/createRacaAnimalTable';
import scriptFaixaEtariaTable from '../scripts/createFaixaEtariaTable';
import scriptLoteTable from '../scripts/createLoteTable';
import scriptAreaTable from '../scripts/createAreaTable';
import scriptSolicitacaoBrincosTable from '../scripts/createSolicitacaoBrincosTable';
import scriptSisbovChipTable from '../scripts/createSisbovChipTable';

export default async () => {
    try {

        await scriptEntidade();
        await scriptAnimal();
        await scriptSyncTable();
        await scriptTMTable();
        await scriptMovimentacaoTable();
        await scriptMovimentacaoAnimalTable();
        await scriptHistoricoPesoTable();
        await scriptContextoTable();
        await scriptContextoFazendaTable();
        await scriptRacaAnimalTable();
        await scriptFaixaEtariaTable();
        await scriptLoteTable();
        await scriptAreaTable();
        scriptSolicitacaoBrincosTable();
        scriptSisbovChipTable();

    } catch (e) {
        throw new Error(e);
    }
}
