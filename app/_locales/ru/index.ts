import {
  TLocaleSet,
} from '../../src/types';

const translations : TLocaleSet = {
  inputHint: 'Digite o lance or digite / para ver os comandos...',
  focusHint: 'Aperte C para dar foco no campo de lances...',
  focusHintFromOther: 'Aperte Esc + C dar foco no campo de lances...',
  ambiguousMove: 'Lance ambíguo: $move',
  incorrectMove: 'Lance invalido: $move',
  illegalMove: 'Lance $move é ilegal',
  commandNotFound: "Não encontrei o comando $command",
  blindFoldPeekHint: 'Passe o mouse aqui ou aperte $key to olhar',
  blindFoldOn: 'O modo as cegas está ativado',
  blindfoldToggleHint: 'Clique aqui ou digite /blindfold para mudar',
  _test: 'Conteudo teste',
  _test_1_placeholder: 'Conteudo teste $name1',
  _test_2_placeholders: 'Conteudo teste $name1 $name2',
};

export default translations;
