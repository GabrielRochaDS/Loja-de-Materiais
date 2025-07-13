package com.lojamateriais.apirestful.repository;

import com.lojamateriais.apirestful.model.Produto;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select p from Produto p left outer join fetch p.categoria where p.id = :id")
    Optional<Produto> recuperarProdutoPorIdComLock(@Param("id") Long id);

    @Query("select p from Produto p left outer join fetch p.categoria order by p.id")
    List<Produto> recuperarProdutosComCategoria();

    @Query("select p from Produto p left outer join fetch p.categoria where p.id = :id")
    Optional<Produto> recuperarProdutoPorId(@Param("id") Long id);

    @Query(
            value = "select p " +
                    "from Produto p " +
                    "left outer join fetch p.categoria " +
                    "where p.nome like :nome " +
                    "order by p.id",
            countQuery = "select count(p) from Produto p where p.nome like :nome"
    )
    Page<Produto> recuperarProdutosComPaginacao(Pageable pageable, @Param("nome") String nome);

    @Query("select p from Produto p " +
            "left outer join fetch p.categoria c " +
            "where c.slug = :slugCategoria " +
            "order by p.id")
    List<Produto> recuperarProdutosPorSlugCategoria(@Param("slugCategoria") String slugCategoria);

    @Query(
            value = "select p from Produto p " +
                    "left outer join fetch p.categoria c " +
                    "where c.slug = :slug " +
                    "order by p.id",
            countQuery = "select count(p) " +
                    "from Produto p " +
                    "left outer join p.categoria c " +
                    "where c.slug = :slug "
    )
    Page<Produto> recuperarProdutosPaginadosPorSlugDaCategoria(@Param("slug") String slug, Pageable pageable);

    @Query(
            value = "select p from Produto p " +
                    "left outer join fetch p.categoria c " +
                    "order by p.id",
            countQuery = "select count(p) from Produto p "
    )
    Page<Produto> recuperarProdutosPaginados(Pageable pageable);
}
