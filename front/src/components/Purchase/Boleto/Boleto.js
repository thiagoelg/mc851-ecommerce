import React, {Component} from "react"
import "./Boleto.css"
import UserProfile from "../../../state/UserProfile";
import MoneyFormatter from "../../Formatters/MoneyFormatter";
import Barcode from "react-barcode"

class Boleto extends Component {

    constructor(props) {
        super(props);

        this.state = {
            purchase: props.location.state.purchase
        }
    }

    render() {
        const purchase = this.state.purchase;
        const address = purchase.shipping.address;

        return (
            <div>
                <p align="center">
                    <table cellSpacing={0} cellPadding={0} border={0} className="Boleto">

                        <tr>
                            <td style={{width: "0.9cm"}}/>
                            <td style={{width: "1cm"}}/>
                            <td style={{width: "1.9cm"}}/>

                            <td style={{width: "0.5cm"}}/>
                            <td style={{width: "1.3cm"}}/>
                            <td style={{width: "0.8cm"}}/>
                            <td style={{width: "1cm"}}/>

                            <td style={{width: "1.9cm"}}/>
                            <td style={{width: "1.9cm"}}/>

                            <td style={{width: "3.8cm"}}/>

                            <td style={{width: "3.8cm"}}/>
                        </tr>
                        <tr>
                            <td colSpan={11}>
                                <ul className="BoletoInstrucoes">
                                    <li>Imprima em papel A4 ou Carta</li>
                                    <li>Utilize margens mínimas a direita e a esquerda</li>
                                    <li>Recorte na linha pontilhada</li>
                                    <li>Não rasure o código de barras</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={11} className="BoletoPontilhado">&nbsp;</td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="BoletoLogo"><img src='/imgs/others/caixa.jpg' alt="caixa"/></td>
                            <td colSpan={2} className="BoletoCodigoBanco">104-0</td>
                            <td colSpan={6} className="BoletoLinhaDigitavel">LinhaDigitavel</td>
                        </tr>
                        <tr>
                            <td colSpan={10} className="BoletoTituloEsquerdo">Local de Pagamento</td>
                            <td className="BoletoTituloDireito">Vencimento</td>
                        </tr>
                        <tr>
                            <td colSpan={10} className="BoletoValorEsquerdo"
                                style={{textAlign: "left", paddingLeft: "0.1cm"}}>
                                QUALQUER AGÊNCIA DA CAIXA
                            </td>
                            <td className="BoletoValorDireito">{purchase.payment.boleto.dueDate}</td>
                        </tr>
                        <tr>
                            <td colSpan={10} className="BoletoTituloEsquerdo">Cedente</td>
                            <td className="BoletoTituloDireito">Agência/Código do Cedente</td>
                        </tr>
                        <tr>
                            <td colSpan={10} className="BoletoValorEsquerdo"
                                style={{textAlign: "left", paddingLeft: "0.1cm"}}>
                                NF-e Associacao NF-e
                            </td>
                            <td className="BoletoValorDireito">1111-8/0002222-5</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="BoletoTituloEsquerdo">Data do Documento</td>
                            <td colSpan={4} className="BoletoTituloEsquerdo">Número do Documento</td>
                            <td className="BoletoTituloEsquerdo">Espécie</td>
                            <td className="BoletoTituloEsquerdo">Aceite</td>
                            <td className="BoletoTituloEsquerdo">Data do Processamento</td>
                            <td className="BoletoTituloDireito">Nosso Número</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="BoletoValorEsquerdo">{purchase.createdAt}</td>
                            <td colSpan={4} className="BoletoValorEsquerdo">{purchase.payment.boleto.documentRep}</td>
                            <td className="BoletoValorEsquerdo">RC</td>
                            <td className="BoletoValorEsquerdo">N</td>
                            <td className="BoletoValorEsquerdo">{purchase.createdAt}</td>
                            <td className="BoletoValorDireito">06/00000001001-6</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="BoletoTituloEsquerdo">Uso do Banco</td>
                            <td colSpan={2} className="BoletoTituloEsquerdo">Carteira</td>
                            <td colSpan={2} className="BoletoTituloEsquerdo">Moeda</td>
                            <td colSpan={2} className="BoletoTituloEsquerdo">Quantidade</td>
                            <td className="BoletoTituloEsquerdo">(x) Valor</td>
                            <td className="BoletoTituloDireito">(=) Valor do Documento</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="BoletoValorEsquerdo">&nbsp;</td>
                            <td colSpan={2} className="BoletoValorEsquerdo">SR</td>
                            <td colSpan={2} className="BoletoValorEsquerdo">R$</td>
                            <td colSpan={2} className="BoletoValorEsquerdo">&nbsp;</td>
                            <td className="BoletoValorEsquerdo">&nbsp;</td>
                            <td className="BoletoValorDireito"><MoneyFormatter value={purchase.payment.price/100}/></td>
                        </tr>
                        <tr>
                            <td colSpan={10} className="BoletoTituloEsquerdo">Instrucao</td>
                            <td className="BoletoTituloDireito">(-) Desconto</td>
                        </tr>
                        <tr>
                            <td colSpan={10} rowSpan={9} className="BoletoValorEsquerdo"
                                style={{textAlign: "left", verticalAlign: "top", paddingLeft: "0.1cm"}}>
                                Não receber após o vencimento.
                            </td>
                            <td className="BoletoValorDireito">&nbsp;</td>
                        </tr>
                        <tr>
                            <td className="BoletoTituloDireito">(-) Outras Deduções/Abatimento</td>
                        </tr>
                        <tr>
                            <td className="BoletoValorDireito">&nbsp;</td>
                        </tr>
                        <tr>
                            <td className="BoletoTituloDireito">(+) Mora/Multa/Juros</td>
                        </tr>
                        <tr>
                            <td className="BoletoValorDireito">&nbsp;</td>
                        </tr>
                        <tr>
                            <td className="BoletoTituloDireito">(+) Outros Acréscimos</td>
                        </tr>
                        <tr>
                            <td className="BoletoValorDireito">&nbsp;</td>
                        </tr>
                        <tr>
                            <td className="BoletoTituloDireito">(=) Valor Cobrado</td>
                        </tr>
                        <tr>
                            <td className="BoletoValorDireito">&nbsp;</td>
                        </tr>
                        <tr>
                            <td rowSpan={3} className="BoletoTituloSacado">Sacado:</td>
                            <td colSpan={8} className="BoletoValorSacado">{UserProfile.getName()}</td>
                            <td colSpan={2} className="BoletoValorSacado">{UserProfile.getCpf()}</td>
                        </tr>
                        <tr>
                            <td colSpan={10} className="BoletoValorSacado">
                                {address.street}, {address.number}, {address.neighborhood}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={10} className="BoletoValorSacado">
                                {address.city}, {address.state}&nbsp;&nbsp;&nbsp;{address.cep}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="BoletoTituloSacador">Sacador / Avalista:</td>
                            <td colSpan={9} className="BoletoValorSacador">{UserProfile.getName()}</td>
                        </tr>
                        <tr>
                            <td colSpan={11} className="BoletoTituloDireito"
                                style={{textAlign: "right", paddingRight: "0.1cm"}}>Recibo do Sacado - Autenticação
                                Mecânica
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={11} height={60} valign="top"></td>
                        </tr>
                        <tr>
                            <td colSpan={11} className="BoletoPontilhado">&nbsp;</td>
                        </tr>
                        <tr>
                            <td colSpan={4} className="BoletoLogo"><img src='/imgs/others/caixa.jpg' alt="caixa"/></td>
                            <td colSpan={2} className="BoletoCodigoBanco">104-0</td>
                            <td colSpan={6} className="BoletoLinhaDigitavel">LinhaDigitavel</td>
                        </tr>
                        <tr>
                            <td colSpan={10} className="BoletoTituloEsquerdo">Local de Pagamento</td>
                            <td className="BoletoTituloDireito">Vencimento</td>
                        </tr>
                        <tr>
                            <td colSpan={10} className="BoletoValorEsquerdo"
                                style={{textAlign: "left", paddingLeft: "0.1cm"}}>
                                QUALQUER AGÊNCIA DA CAIXA
                            </td>
                            <td className="BoletoValorDireito">{purchase.payment.boleto.dueDate}</td>
                        </tr>
                        <tr>
                            <td colSpan={10} className="BoletoTituloEsquerdo">Cedente</td>
                            <td className="BoletoTituloDireito">Agência/Código do Cedente</td>
                        </tr>
                        <tr>
                            <td colSpan={10} className="BoletoValorEsquerdo"
                                style={{textAlign: "left", paddingLeft: "0.1cm"}}>
                                NF-e Associacao NF-e
                            </td>
                            <td className="BoletoValorDireito">1111-8/0002222-5</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="BoletoTituloEsquerdo">Data do Documento</td>
                            <td colSpan={4} className="BoletoTituloEsquerdo">Número do Documento</td>
                            <td className="BoletoTituloEsquerdo">Espécie</td>
                            <td className="BoletoTituloEsquerdo">Aceite</td>
                            <td className="BoletoTituloEsquerdo">Data do Processamento</td>
                            <td className="BoletoTituloDireito">Nosso Número</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="BoletoValorEsquerdo">{purchase.createdAt}</td>
                            <td colSpan={4} className="BoletoValorEsquerdo">{purchase.payment.boleto.documentRep}</td>
                            <td className="BoletoValorEsquerdo">RC</td>
                            <td className="BoletoValorEsquerdo">N</td>
                            <td className="BoletoValorEsquerdo">{purchase.createdAt}</td>
                            <td className="BoletoValorDireito">06/00000001001-6</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="BoletoTituloEsquerdo">Uso do Banco</td>
                            <td colSpan={2} className="BoletoTituloEsquerdo">Carteira</td>
                            <td colSpan={2} className="BoletoTituloEsquerdo">Moeda</td>
                            <td colSpan={2} className="BoletoTituloEsquerdo">Quantidade</td>
                            <td className="BoletoTituloEsquerdo">(x) Valor</td>
                            <td className="BoletoTituloDireito">(=) Valor do Documento</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="BoletoValorEsquerdo">&nbsp;</td>
                            <td colSpan={2} className="BoletoValorEsquerdo">SR</td>
                            <td colSpan={2} className="BoletoValorEsquerdo">R$</td>
                            <td colSpan={2} className="BoletoValorEsquerdo">&nbsp;</td>
                            <td className="BoletoValorEsquerdo">&nbsp;</td>
                            <td className="BoletoValorDireito"><MoneyFormatter value={purchase.payment.price/100}/></td>
                        </tr>
                        <tr>
                            <td colSpan={10} className="BoletoTituloEsquerdo">Instrucao</td>
                            <td className="BoletoTituloDireito">(-) Desconto</td>
                        </tr>
                        <tr>
                            <td colSpan={10} rowSpan={9} className="BoletoValorEsquerdo"
                                style={{textAlign: "left", verticalAlign: "top", paddingLeft: "0.1cm"}}>
                                Não receber após o vencimento.
                            </td>
                            <td className="BoletoValorDireito">&nbsp;</td>
                        </tr>
                        <tr>
                            <td className="BoletoTituloDireito">(-) Outras Deduções/Abatimento</td>
                        </tr>
                        <tr>
                            <td className="BoletoValorDireito">&nbsp;</td>
                        </tr>
                        <tr>
                            <td className="BoletoTituloDireito">(+) Mora/Multa/Juros</td>
                        </tr>
                        <tr>
                            <td className="BoletoValorDireito">&nbsp;</td>
                        </tr>
                        <tr>
                            <td className="BoletoTituloDireito">(+) Outros Acréscimos</td>
                        </tr>
                        <tr>
                            <td className="BoletoValorDireito">&nbsp;</td>
                        </tr>
                        <tr>
                            <td className="BoletoTituloDireito">(=) Valor Cobrado</td>
                        </tr>
                        <tr>
                            <td className="BoletoValorDireito">&nbsp;</td>
                        </tr>
                        <tr>
                            <td rowSpan={3} className="BoletoTituloSacado">Sacado:</td>
                            <td colSpan={8} className="BoletoValorSacado">{UserProfile.getName()}</td>
                            <td colSpan={2} className="BoletoValorSacado">{UserProfile.getCpf()}</td>
                        </tr>
                        <tr>
                            <td colSpan={10} className="BoletoValorSacado">
                                {address.street}, {address.number}, {address.neighborhood}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={10} className="BoletoValorSacado">
                                {address.city}, {address.state}&nbsp;&nbsp;&nbsp;{address.cep}</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="BoletoTituloSacador">Sacador / Avalista:</td>
                            <td colSpan={9} className="BoletoValorSacador">{UserProfile.getName()}</td>
                        </tr>
                        <tr>
                            <td colSpan={11} className="BoletoTituloDireito"
                                style={{textAlign: "right", paddingRight: "0.1cm"}}>Ficha de Compensação - Autenticação
                                Mecânica
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={11} height={60} valign="top">
                                <Barcode height={60} value={purchase.payment.boleto.barCode} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={11} className="BoletoPontilhado">&nbsp;</td>
                        </tr>
                    </table>
                </p>
            </div>
        )
    }

}

export default Boleto;