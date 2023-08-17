class CaixaDaLanchonete {
    constructor() {
        this.FormaPagamento = {
            DINHEIRO: 'dinheiro',
            DEBITO: 'debito',
            CREDITO: 'credito'
        };

        this.cardapio = {
            cafe: { descricao: 'Café', valor: 3.00 },
            chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50 },
            suco: { descricao: 'Suco Natural', valor: 6.20 },
            sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
            queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            salgado: { descricao: 'Salgado', valor: 7.25 },
            combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
        };
    }

    calcularValorComExtras(item, pedido) {
        if (pedido.includes(item)) {
            const extraItem = `extra_${item}`;
            return this.cardapio[item].valor + this.cardapio[extraItem].valor;
        }
        return this.cardapio[item].valor;
    }

    isItemPrincipal(item) {
        return !item.startsWith('extra');
    }

    isValidFormaPagamento(formaDePagamento) {
        return Object.values(this.FormaPagamento).includes(formaDePagamento);
    }

    formatarValor(valor) {
        return `R$ ${valor.toFixed(2).replace('.', ',')}`;
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.isValidFormaPagamento(metodoDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let valorTotal = 0;
        let temItemPrincipal = false;

        for (const item of itens) {
            if (item in this.cardapio) {
                valorTotal += this.calcularValorComExtras(item, itens);

                if (!temItemPrincipal && this.isItemPrincipal(item)) {
                    temItemPrincipal = true;
                }
            } else {
                return 'Item inválido!';
            }
        }

        if (!temItemPrincipal) {
            return 'Quantidade inválida!';
        }

        if (metodoDePagamento === this.FormaPagamento.DINHEIRO) {
            valorTotal *= 0.95; // 5% de desconto
        } else if (metodoDePagamento === this.FormaPagamento.CREDITO) {
            valorTotal *= 1.03; // 3% de acréscimo
        }

        return this.formatarValor(valorTotal);
    }
}


  export { CaixaDaLanchonete };
  