package com.lojamateriais.apirestful.model;
// - total de itens
// - total de páginas
// - pagina corrente
// - itens da página corrente

import java.util.List;

public record ResultadoPaginado<T>(
        long totalDeItens,
        int totalDePaginas,
        int paginaCorrente,
        List<T> itens
) { }
