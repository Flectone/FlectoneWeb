---
order: 100
authors:
  - TheFaser
---

# API

FlectonePulse — это мощный плагин для Minecraft, позволяющий настраивать сообщения сервера, чат, команды и интеграции. Поддерживает платформы Bukkit, Spigot, Paper, Purpur, Folia, BungeeCord, Velocity и Fabric. Использует Google Guice для внедрения зависимостей, при этом большинство классов (кроме моделей) помечены аннотацией `@Singleton`

## Подключение зависимости

FlectonePulse доступен в Maven Central. Ниже приведены конфигурации для подключения в проекте через Maven, Gradle (Groovy) или Gradle (Kotlin DSL)

::: code-group

```xml
<dependency>
    <groupId>net.flectone.pulse</groupId>
    <artifactId>core</artifactId>
    <version>1.6.2</version> <!-- Замените на актуальную версию -->
    <scope>provided</scope>
</dependency>
```

```groovy
repositories {
    mavenCentral()
}

dependencies {
    compileOnly 'net.flectone.pulse:core:1.6.2' // Замените на актуальную версию
}
```

```kotlin
repositories {
    mavenCentral()
}

dependencies {
    compileOnly("net.flectone.pulse:core:1.6.2") // Замените на актуальную версию
}
```

:::

Для snapshot-версий:

::: code-group

```xml
<dependency>
    <groupId>net.flectone.pulse</groupId>
    <artifactId>core</artifactId>
    <version>1.6.3-SNAPSHOT</version> <!-- Замените на актуальную версию -->
    <scope>provided</scope>
</dependency>
```

```groovy
repositories {
    maven { url 'https://central.sonatype.com/repository/maven-snapshots/' }
}

dependencies {
    compileOnly 'net.flectone.pulse:core:1.6.3-SNAPSHOT' // Замените на актуальную версию
}
```

```kotlin
repositories {
    maven { url = uri("https://central.sonatype.com/repository/maven-snapshots/") }
}

dependencies {
    compileOnly("net.flectone.pulse:core:1.6.3-SNAPSHOT") // Замените на актуальную версию
}
```

:::

## Пример для Bukkit

Пример плагина для Bukkit, использующего FlectonePulse для вывода сообщения "Hello from FlectonePulse"

### plugin.yml
```yaml
name: MyPlugin
version: 1.0.0
main: com.example.myplugin.MyPlugin
api-version: 1.13
softdepend:
  - FlectonePulse
```

### Пример кода плагина
```java
package com.example.myplugin;

import net.flectone.pulse.FlectonePulse;
import net.flectone.pulse.FlectonePulseAPI;
import net.flectone.pulse.util.logging.FLogger;
import org.bukkit.Bukkit;
import org.bukkit.plugin.java.JavaPlugin;

public class MyPlugin extends JavaPlugin {

    @Override
    public void onEnable() {
        if (Bukkit.getPluginManager().getPlugin("FlectonePulse") != null) {
            FlectonePulse flectonePulse = FlectonePulseAPI.getInstance();

            FLogger fLogger = flectonePulse.get(FLogger.class);
            fLogger.info("Hello from FlectonePulse");
        }
    }
}
```

## Ключевые методы API

```java
FlectonePulse flectonePulse = FlectonePulseAPI.getInstance();

// Получение singleton-экземпляр указанного класса через внедрение зависимостей Guice
// Class<?> clazz = ...
// flectonePulse.get(clazz);
FLogger fLogger = flectonePulse.get(FLogger.class);

// Проверка, готов ли инжектор к работе
flectonePulse.isReady();

// Перезагружает плагин, выбрасывая `ReloadException` при ошибках
flectonePulse.reload();
```

## Примечания

- Убедитесь, что FlectonePulse установлен на сервере и указан как softdepend в `plugin.yml`
- Используйте `isReady()`, чтобы проверить готовность инжектора перед вызовом `get()`