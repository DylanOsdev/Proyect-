# Requisitos No Funcionales

| ID | Categoría | Requisito No Funcional | Criterio de Aceptación (Métrica Técnica) |
|---|---|---|---|
| RNF-01 | Rendimiento | Velocidad de Carga Web | El tiempo de carga del catálogo (First Contentful Paint) debe ser inferior a 2.5 segundos en conexiones 4G estándar. |
| RNF-02 | Rendimiento | Procesamiento de Transacciones | El tiempo entre la confirmación del pedido y la generación del registro en BD (incluyendo OTP) no debe superar los 3 segundos. |
| RNF-03 | Seguridad | Cifrado de Credenciales | Las contraseñas de todos los usuarios deben almacenarse encriptadas utilizando algoritmos de hash robustos (Bcrypt o Argon2). |
| RNF-04 | Seguridad | Inmutabilidad de Auditoría | La tabla Auditoria_Inventario debe tener restricciones de base de datos que impidan sentencias DELETE o UPDATE directas. |
| RNF-05 | Seguridad | Caducidad del Token OTP | El Código de Seguridad (OTP) generado para la entrega debe tener una validez lógica asociada al estado del pedido (se invalida al cerrar el pedido). |
| RNF-06 | Disponibilidad | Persistencia Local (Offline) | El carrito de compras de usuarios invitados debe persistir en el localStorage del navegador por un mínimo de 24 horas si no se borran las cookies. |
| RNF-07 | Integridad | Consistencia Transaccional (ACID) | Las operaciones críticas (Venta, Ajuste Stock) deben ejecutarse dentro de Transacciones SQL (START TRANSACTION / COMMIT) para evitar datos corruptos. |
| RNF-08 | Usabilidad | Diseño Responsivo (Mobile First) | El 100% de las interfaces (Cliente y Panel Empleado) deben ser funcionales y legibles en dispositivos móviles con ancho mínimo de 360px. |
| RNF-09 | Legal | Trazabilidad de Consentimiento | El sistema debe registrar la Dirección IP y la Marca de Tiempo (Timestamp) exacta de la aceptación de términos y condiciones. |
| RNF-10 | Escalabilidad | Concurrencia de Usuarios | El sistema debe soportar un mínimo de 50 usuarios concurrentes realizando operaciones de lectura/escritura sin degradación del servicio (Error 500/Timeout). |
| RNF-11 | Mantenibilidad | Estructura de Datos | La base de datos debe mantener Integridad Referencial (FOREIGN KEYS con ON DELETE CASCADE/RESTRICT) en todas las relaciones críticas. |
| RNF-12 | Fiabilidad | Validación de Entradas | El sistema debe rechazar en Backend y Frontend cualquier valor numérico negativo en campos de precios o stock (Sanitización de inputs). |
| RNF-13 | Seguridad | Control de Sesión Única | Para el rol 'Empleado', el sistema debe invalidar la sesión anterior si se detecta un nuevo inicio de sesión en otro dispositivo (prevención de fraude en caja). |
| RNF-14 | Usabilidad | Feedback del Sistema | Toda acción del usuario (Click en botón, Envío de form) debe tener una respuesta visual (Spinner, Toast, Mensaje) en menos de 0.5 segundos. |
| RNF-15 | Infraestructura | Respaldo de Datos (Backup) | La base de datos debe ser compatible con herramientas estándar de volcado (mysqldump) para permitir copias de seguridad completas y restauración sin pérdida de estructura. |