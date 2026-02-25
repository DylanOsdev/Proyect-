# Requisitos Funcionales

| Módulo | Subproceso | Nro. RF | Requisito Funcional | Actor | Nro.RN | Regla de Negocio (Lógica) | Nro. RI | Requisitos de Información (Datos) |
|---|---|---|---|---|---|---|---|---|
| SEGURIDAD Y ACCESO | Gestión de identidad | RF-01 | Registro de Clientes | Cliente | RN-01 | Unicidad: No se permite registrar dos cuentas con el mismo correo electrónico. | RI-01 | Nombre_Completo, Correo, Password, Fecha_Nacimiento. |
| | | RF-02 | Validación de Edad | Sistema | RN-02 | Bloqueo Legal: El sistema calcula la edad con la fecha de nacimiento; si es < 18, impide el registro o acceso. | RI-02 | Fecha_Nacimiento, Edad_Calculada, Permiso_Acceso (True/False). |
| | | RF-03 | Aceptación Legal | Cliente | RN-03 | Consentimiento: Es obligatorio marcar el check de Habeas Data para crear la cuenta. | RI-03 | Check_Aceptacion, Fecha_Hora_Registro, IP_Usuario. |
| | Autenticación | RF-04 | Inicio de Sesión | Usuario | RN-04 | Cifrado: Las credenciales se validan contra un hash encriptado en la BD, nunca texto plano. | RI-04 | Correo_Electronico, Password_Hash. |
| | | RF-05 | Registro de Intentos | Sistema | RN-05 | Traza de Seguridad: Se debe guardar IP, fecha y resultado de cada intento de login. | RI-05 | IP_Address, Fecha_Hora, Resultado (Exitoso/Fallido). |
| | | RF-06 | Recuperación Clave | Sistema | RN-06 | Token: Envío de un enlace temporal único al correo registrado para restablecer la contraseña. | RI-06 | Correo_Destino, Token_Temporal, Fecha_Expiracion. |
| | | RF-07 | Cierre de Sesión | Usuario | RN-07 | Invalidación: Al salir, la sesión actual debe destruirse para evitar reingresos no autorizados. | RI-07 | Token_Sesion, Estado_Sesion (Activa/Inactiva). |
| | Control Admin | RF-08 | Bloqueo de Usuarios | Admin | RN-08 | Sanción: El Administrador puede cambiar el estado de un usuario a 'Bloqueado' manualmente. | RI-08 | ID_Usuario, Nuevo_Estado ('Activo'/'Bloqueado'). |
| CLIENTE (MI CUENTA) | Perfil | RF-09 | Actualizar Datos | Cliente | RN-09 | Integridad: El usuario puede editar nombre y teléfono, pero el correo (ID) es inmodificable. | RI-09 | ID_Usuario, Nuevo_Telefono, Nuevo_Nombre. |
| | Direcciones | RF-10 | Crear Dirección | Cliente | RN-10 | Alias: Permitir guardar ubicaciones con nombres personalizados (Ej: Casa, Oficina). | RI-10 | ID_Usuario, Alias (Casa/Oficina), Direccion_Texto, Barrio. |
| | | RF-11 | Editar/Eliminar Dirección | Cliente | RN-11 | Propiedad: Un usuario solo puede gestionar las direcciones asociadas a su propio ID. | RI-11 | ID_Direccion, Datos_Modificados. |
| | | RF-12 | Dirección Principal | Cliente | RN-12 | Default: La dirección marcada como principal se selecciona automáticamente en el checkout. | RI-12 | ID_Direccion, Es_Principal (True/False). |
| | Historial | RF-13 | Ver Pedidos Pasados | Cliente | RN-13 | Cronología: Listado de compras ordenado descendente (del más reciente al más antiguo). | RI-13 | ID_Usuario, Lista_Pedidos (ID, Fecha, Total, Estado). |
| | | RF-14 | Ver Detalle Pedido | Cliente | RN-14 | Inmutabilidad: El detalle muestra el precio que tenía el producto al momento de la compra, no el actual. | RI-14 | ID_Pedido, Lista_Productos, Precios_Historicos, Cantidad. |
| ALMACÉN E INVENTARIO | Productos | RF-15 | Crear Producto | Admin | RN-15 | Costeo: Es obligatorio ingresar Precio Venta y Costo Unitario para calcular márgenes futuros. | RI-15 | Nombre, Descripcion, Precio_Venta, Costo_Unitario, ID_Categoria, Imagen. |
| | | RF-16 | Editar Producto | Admin | RN-16 | Reflejo Web: Cualquier cambio en nombre o precio se actualiza inmediatamente en el catálogo. | RI-16 | ID_Producto, Campo_Modificado, Nuevo_Valor. |
| | | RF-17 | Desactivar Producto | Admin | RN-17 | Soft Delete: El producto no se borra de la BD, cambia a estado 'Inactivo' para conservar historial. | RI-17 | ID_Producto, Estado ('Activo'/'Descontinuado'). |
| | | RF-18 | Gestión Categorías | Admin | RN-18 | Organización: Todo producto debe estar asociado a una categoría activa. | RI-18 | ID_Categoria, Nombre_Categoria. |
| | Stock | RF-19 | Ajuste Manual Stock | Admin | RN-19 | Auditoría: Solo el Admin puede ajustar stock y debe ingresar un motivo (Merma, Regalo). | RI-19 | ID_Producto, Cantidad_Ajuste (+/-), Motivo_Ajuste, ID_Admin. |
| | | RF-20 | Control Lotes/FEFO | Sistema | RN-20 | Calidad: El sistema alerta sobre lotes con fecha de vencimiento próxima (<30 días). | RI-20 | ID_Producto, Lote, Fecha_Vencimiento. |
| | | RF-21 | Alerta Stock Bajo | Sistema | RN-21 | Trigger: Se genera una alerta automática cuando Stock_Actual <= Stock_Minimo. | RI-21 | ID_Producto, Stock_Actual, Stock_Minimo, Tipo_Alerta. |
| | | RF-22 | Historial Precios | Sistema | RN-22 | Trazabilidad: Al actualizar un precio, el sistema guarda automáticamente el valor anterior. | RI-22 | ID_Producto, Precio_Anterior, Precio_Nuevo, Fecha_Cambio, Usuario_Responsable. |
| VENTAS WEB | Catálogo | RF-23 | Visualizar Catálogo | Cliente | RN-23 | Disponibilidad: Solo se muestran productos con estado 'Activo' y stock disponible. | RI-23 | Lista_Productos (Filtrada por Estado='Activo' y Stock > 0). |
| | | RF-24 | Buscador Predictivo | Cliente | RN-24 | Coincidencia: La búsqueda encuentra productos por fragmentos de nombre. | RI-24 | Texto_Busqueda, Coincidencias_Nombre. |
| | | RF-25 | Filtros Avanzados | Cliente | RN-25 | Multicriterio: Permite filtrar por Categoría y Rango de Precio simultáneamente. | RI-25 | ID_Categoria_Seleccionada, Precio_Min, Precio_Max. |
| | Carrito | RF-26 | Agregar al Carrito | Cliente | RN-26 | Límite: No permite agregar una cantidad mayor al stock disponible en ese instante. | RI-26 | ID_Producto, Cantidad_Solicitada. |
| | | RF-27 | Persistencia Carrito | Sistema | RN-27 | Memoria: Si es invitado usa el Navegador; si es registrado se guarda en la Base de Datos. | RI-27 | ID_Usuario (si registrado), JSON_Productos (Local). |
| | Checkout | RF-28 | Compra Invitado | Cliente | RN-28 | Snapshot: Los datos de envío se guardan en el pedido textual, sin crear usuario en la BD. | RI-28 | Nombre_Contacto, Telefono_Contacto, Direccion_Entrega, Email_Contacto. |
| | | RF-29 | Selección Pago | Cliente | RN-29 | Flexibilidad: Soporte para métodos Efectivo (Contraentrega) y Transferencia. | RI-29 | Tipo_Pago ('Efectivo', 'Transferencia', 'Tarjeta'). |
| | | RF-30 | Confirmación Pedido | Sistema | RN-30 | ID Único: Al confirmar, se genera un número de pedido consecutivo único. | RI-30 | ID_Pedido_Generado, Fecha_Hora, Total_Final. |
| | | RF-31 | Generación OTP | Sistema | RN-31 | Seguridad: El sistema crea un código aleatorio de 4 dígitos automáticamente (Trigger). | RI-31 | Codigo_OTP (4 dígitos aleatorios). |
| LOGÍSTICA Y ENTREGAS | Despacho | RF-32 | Switch Disponibilidad | Empleado | RN-32 | Estado: El empleado define manualmente si está 'Disponible' u 'Ocupado' para recibir pedidos. | RI-32 | ID_Empleado, Estado ('Disponible'/'Ocupado'). |
| | | RF-33 | Asignación Reparto | Sistema | RN-33 | Regla: El sistema solo permite asignar pedidos a empleados en estado 'Disponible'. | RI-33 | ID_Pedido, ID_Repartidor. |
| | | RF-34 | Visualización Ruta | Empleado | RN-34 | Integración: Botón directo para abrir la dirección en Waze/Google Maps. | RI-34 | Direccion_Texto, Enlace_Mapa (Lat/Lon). |
| | Entregas | RF-35 | Validación OTP | Empleado | RN-35 | Cierre Seguro: El repartidor debe ingresar el código del cliente; si coincide, el pedido se cierra. | RI-35 | OTP_Ingresado, Resultado_Validacion (Match/Error). |
| | | RF-36 | Reporte Novedades | Empleado | RN-36 | Excepción: Si la entrega falla, se registra el motivo y el estado pasa a 'Devuelto'. | RI-36 | ID_Pedido, Tipo_Novedad, Observacion. |
| | | RF-37 | Retorno Stock | Sistema | RN-37 | Restocking: Si un pedido se cancela o devuelve, el stock se suma automáticamente (Trigger). | RI-37 | ID_Pedido_Cancelado, Items_A_Devolver. |
| POS (PUNTO DE VENTA) | Venta local | RF-38 | Búsqueda Rápida POS | Empleado | RN-38 | Agilidad: Interfaz optimizada para agregar productos al ticket con pocos clics. | RI-38 | Codigo_Barras o Nombre_Producto. |
| | | RF-39 | Registro Venta POS | Empleado | RN-39 | Descarga Real: La venta física descuenta del mismo inventario que la web en tiempo real. | RI-39 | ID_Cajero, Lista_Productos, Total_Venta, Origen='POS'. |
| | | RF-40 | Cálculo Cambio | Sistema | RN-40 | Ayuda: El sistema calcula automáticamente (Dinero Recibido - Total) para evitar errores. | RI-40 | Dinero_Recibido, Total_Pagar, Cambio_Calculado. |
| | | RF-41 | Venta Múltiple | Empleado | RN-41 | Agrupación: Permite procesar varios productos en una sola transacción de caja. | RI-41 | Array_Items_Venta (Producto, Cantidad). |
| FINANZAS Y CONTROL | Caja | RF-42 | Registro Gastos | Empleado | RN-42 | Cuadre: Los gastos registrados (gasolina) se restan del dinero esperado en caja. | RI-42 | ID_Empleado, Monto_Gasto, Descripcion_Motivo. |
| | | RF-43 | Arqueo Caja | Empleado | RN-43 | Cierre Ciego: El empleado ingresa el dinero que tiene sin que el sistema le diga cuánto debería haber. | RI-43 | ID_Empleado, Monto_Real_Contado (Billetes/Monedas). |
| | | RF-44 | Cálculo Diferencia | Sistema | RN-44 | Automático: El sistema compara (Ventas - Gastos) vs Real y guarda la diferencia. | RI-44 | Ventas_Sistema, Gastos_Registrados, Monto_Real, Diferencia_Calculada. |
| | | RF-45 | Auditoría Cierres | Admin | RN-45 | Histórico: El Admin puede ver el historial de sobrantes/faltantes por empleado. | RI-45 | ID_Arqueo, Empleado, Fecha, Valor_Diferencia. |
| | Reportes | RF-46 | Reporte Ventas | Admin | RN-46 | Filtro: Consulta de ventas totales filtradas por rango de fechas. | RI-46 | Fecha_Inicio, Fecha_Fin, Total_Ventas. |
| | | RF-47 | Reporte Utilidad | Sistema | RN-47 | Rentabilidad: Cálculo automático de (Precio Venta - Costo Unitario) * Cantidad. | RI-47 | Total_Ventas - Total_Costos_Unitarios. |
| SOPORTE Y AUDITORÍA | PQRS | RF-48 | Crear Ticket | Cliente | RN-48 | Acceso: Tanto clientes registrados como invitados pueden generar solicitudes de soporte. | RI-48 | Correo_Contacto, Asunto, Mensaje_Problema. |
| | | RF-49 | Gestión Tickets | Admin | RN-49 | Ciclo: El Admin responde la solicitud y cambia el estado del ticket a 'Cerrado'. | RI-49 | ID_Ticket, Respuesta_Admin, Nuevo_Estado ('Cerrado'). |
| | Seguridad | RF-50 | Bitácora Forense | Sistema | RN-50 | Inmutabilidad: Registro automático de cambios críticos (stock/precios) que no puede ser borrado ni por el Admin. | RI-50 | Usuario_Responsable, Accion_Realizada, Valor_Antiguo, Valor_Nuevo, Fecha. |