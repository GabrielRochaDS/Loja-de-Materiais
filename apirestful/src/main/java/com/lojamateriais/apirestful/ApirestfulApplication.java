package com.lojamateriais.apirestful;

import com.lojamateriais.apirestful.model.Categoria;
import com.lojamateriais.apirestful.model.Produto;
import com.lojamateriais.apirestful.model.Usuario;
import com.lojamateriais.apirestful.repository.CategoriaRepository;
import com.lojamateriais.apirestful.repository.ProdutoRepository;
import com.lojamateriais.apirestful.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@SpringBootApplication
public class ApirestfulApplication implements CommandLineRunner {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private ProdutoRepository produtoRepository;

	@Autowired
	private CategoriaRepository categoriaRepository;

	public static void main(String[] args) {
		SpringApplication.run(ApirestfulApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// Usuário administrador
		Usuario usuario = new Usuario("admin", "construcao123");
		usuarioRepository.save(usuario);

		// Categorias
		Categoria cimento = new Categoria("Cimento", "cimento");
		Categoria madeira = new Categoria("Madeira", "madeira");
		Categoria ferramentas = new Categoria("Ferramentas", "ferramentas");
		Categoria tintas = new Categoria("Tintas", "tintas");
		Categoria telhas = new Categoria("Telhas", "telhas");
		Categoria pisos = new Categoria("Pisos", "pisos");

		categoriaRepository.saveAll(List.of(cimento, madeira, ferramentas, tintas, telhas, pisos));

		// Produtos
		List<Produto> produtos = List.of(
				new Produto("cimento_cp2.png", "Cimento CP-II", "cimento-cp2", "Saco de 50kg", true, 200, BigDecimal.valueOf(42.90), LocalDate.now(), cimento),
				new Produto("cimento_cp4.png", "Cimento CP-IV", "cimento-cp4", "Saco de 50kg para obras especiais", true, 120, BigDecimal.valueOf(49.90), LocalDate.now(), cimento),

				new Produto("madeira_pinho.png", "Madeira Pinho 2x4", "madeira-pinho", "Tábua de 3m", true, 75, BigDecimal.valueOf(34.50), LocalDate.now(), madeira),
				new Produto("compensado.png", "Compensado Naval", "compensado-naval", "Chapa 15mm 2,20x1,60m", true, 30, BigDecimal.valueOf(89.00), LocalDate.now(), madeira),

				new Produto("martelo.png", "Martelo de Unha 27mm", "martelo", "Cabo de madeira reforçado", true, 80, BigDecimal.valueOf(19.90), LocalDate.now(), ferramentas),
				new Produto("furadeira.png", "Furadeira Impacto 650W", "furadeira", "Furadeira com 13mm reversível", true, 40, BigDecimal.valueOf(189.90), LocalDate.now(), ferramentas),

				new Produto("tinta_pva_branca.png", "Tinta PVA Branca 18L", "tinta-pva", "Interior fosca branca", true, 90, BigDecimal.valueOf(110.00), LocalDate.now(), tintas),
				new Produto("tinta_esmalte.png", "Tinta Esmalte Sintético", "tinta-esmalte", "Galão 3,6L azul brilhante", true, 50, BigDecimal.valueOf(65.90), LocalDate.now(), tintas),

				new Produto("telha_ondulada.png", "Telha Ondulada 2,44m", "telha-ondulada", "Fibrocimento 5mm", true, 150, BigDecimal.valueOf(39.90), LocalDate.now(), telhas),
				new Produto("telha_colonial.png", "Telha Colonial Cerâmica", "telha-colonial", "Modelo tradicional vermelha", true, 500, BigDecimal.valueOf(2.99), LocalDate.now(), telhas),

				new Produto("piso_porcelanato.png", "Piso Porcelanato Acetinado", "piso-porcelanato", "60x60cm Bege", true, 100, BigDecimal.valueOf(42.90), LocalDate.now(), pisos),
				new Produto("piso_ceramico.png", "Piso Cerâmico Branco", "piso-ceramico", "45x45cm para interiores", true, 200, BigDecimal.valueOf(28.50), LocalDate.now(), pisos)
		);

		produtoRepository.saveAll(produtos);
	}
}

