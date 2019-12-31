import Entidade from './Entidade';
import Animal from './Animal';
import SyncLog from './SyncLog';
import TiposMovimento from './TiposMovimento';
import Movimento from './Movimentacao';
import MovimentacaoAnimal from './MovimentacaoAnimal';
import Contexto from './Contexto';
import RacaAnimal from './RacaAnimal';
import FaixaEtaria from './FaixaEtaria';

export default (app) => {
    app.use('/entidade', Entidade);
    app.use('/animal', Animal);
    app.use('/syncLog', SyncLog);
    app.use('/tiposMovimento', TiposMovimento);
    app.use('/movimentacao', Movimento);
    app.use('/movimentacaoAnimal', MovimentacaoAnimal);
    app.use('/contexto', Contexto);
    app.use('/racaAnimal', RacaAnimal);
    app.use('/faixaEtaria', FaixaEtaria)
}
