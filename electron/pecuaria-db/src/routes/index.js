import Entidade from './Entidade';
import Animal from './Animal';
import SyncLog from './SyncLog';
import TiposMovimento from './TiposMovimento';
import Movimento from './Movimentacao';
import MovimentacaoAnimal from './MovimentacaoAnimal';
import Contexto from './Contexto';
import RacaAnimal from './RacaAnimal';
import FaixaEtaria from './FaixaEtaria';
import Area from './Area';
import Lote from './Lote';

export default (app) => {
    app.use('/entidade', Entidade);
    app.use('/animal', Animal);
    app.use('/syncLog', SyncLog);
    app.use('/tiposMovimento', TiposMovimento);
    app.use('/movimentacao', Movimento);
    app.use('/movimentacaoAnimal', MovimentacaoAnimal);
    app.use('/contexto', Contexto);
    app.use('/racaAnimal', RacaAnimal);
    app.use('/faixaEtaria', FaixaEtaria);
    app.use('/area', Area);
    app.use('/lote', Lote);
}
