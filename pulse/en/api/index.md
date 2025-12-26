---
order: 100
authors:
  - TheFaser
---

# API

FlectonePulse is a powerful Minecraft plugin for customizing server messages, chat, commands, and integrations, supporting platforms like Bukkit, Spigot, Paper, Purpur, Folia, BungeeCord, Velocity, and Fabric. It uses Google Guice for dependency injection, with most non-model classes annotated as `@Singleton`

## Dependency Integration

FlectonePulse is available on Maven Central. Below are configurations for including it in your project using Maven, Gradle (Groovy), or Gradle (Kotlin DSL)

::: code-group

```xml
<dependency>
    <groupId>net.flectone.pulse</groupId>
    <artifactId>core</artifactId>
    <version>1.7.1</version> <!-- Replace with latest version -->
    <scope>provided</scope>
</dependency>
```

```groovy
repositories {
    mavenCentral()
}

dependencies {
    compileOnly 'net.flectone.pulse:core:1.7.1' // Replace with latest version
}
```

```kotlin
repositories {
    mavenCentral()
}

dependencies {
    compileOnly("net.flectone.pulse:core:1.7.1") // Replace with latest version
}
```

:::

For snapshot versions:

::: code-group

```xml
<dependency>
    <groupId>net.flectone.pulse</groupId>
    <artifactId>core</artifactId>
    <version>1.7.2-SNAPSHOT</version> <!-- Replace with latest version -->
    <scope>provided</scope>
</dependency>
```

```groovy
repositories {
    maven { url 'https://central.sonatype.com/repository/maven-snapshots/' }
}

dependencies {
    compileOnly 'net.flectone.pulse:core:1.7.2-SNAPSHOT' // Replace with latest version
}
```

```kotlin
repositories {
    maven { url = uri("https://central.sonatype.com/repository/maven-snapshots/") }
}

dependencies {
    compileOnly("net.flectone.pulse:core:1.7.2-SNAPSHOT") // Replace with latest version
}
```

:::

## Bukkit Example

Below is an example of a Bukkit plugin using FlectonePulse to print "Hello from FlectonePulse"

### plugin.yml
```yaml
name: MyPlugin
version: 1.0.0
main: com.example.myplugin.MyPlugin
api-version: 1.13
softdepend:
  - FlectonePulse
```

### Example plugin code
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

## Key API Methods

```java
FlectonePulse flectonePulse = FlectonePulseAPI.getInstance();

// Get singleton instance of specified class using Guice dependency injection
// Class<?> clazz = ...
// flectonePulse.get(clazz);
FLogger fLogger = flectonePulse.get(FLogger.class);

// Check if injector is ready
flectonePulse.isReady();

// Reload plugin, throws `ReloadException` on errors
flectonePulse.reload();
```

## Notes

- Ensure FlectonePulse is installed on the server and listed as a softdepend in `plugin.yml`
- Use `isReady()` to verify the injector is ready before calling `get()`
- For registering listeners, use `ListenerRegistry.class` and the `registerPermanent()` method