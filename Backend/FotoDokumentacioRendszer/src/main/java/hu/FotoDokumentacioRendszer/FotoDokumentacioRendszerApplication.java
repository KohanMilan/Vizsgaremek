package hu.FotoDokumentacioRendszer;

import hu.FotoDokumentacioRendszer.interceptor.WebConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import({WebConfig.class}) // Import your custom configuration

public class FotoDokumentacioRendszerApplication {

	public static void main(String[] args) {
		SpringApplication.run(FotoDokumentacioRendszerApplication.class, args);
	}

}