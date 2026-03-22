# Установка Java для сборки Android APK на Windows

## Что нужно

Для сборки APK файла требуется **Java Development Kit (JDK)** версии 17 или выше.

## Пошаговая установка

### 1. Скачай JDK
1. Перейди на [Oracle JDK Downloads](https://www.oracle.com/java/technologies/downloads/)
2. Выбери **Java 17 (LTS)** или новее
3. Скачай версию для **Windows x64 Installer**

### 2. Установи JDK
1. Запусти скачанный `.exe` файл
2. Следуй инструкциям установщика
3. Запомни путь установки (обычно `C:\Program Files\Java\jdk-17.x.x_x`)

### 3. Настрой переменные окружения

#### Через PowerShell (рекомендуется):
```powershell
# Добавь в системные переменные:
[Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\Program Files\Java\jdk-17.x.x_x", "Machine")
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Program Files\Java\jdk-17.x.x_x\bin", "Machine")
```

#### Через графический интерфейс:
1. Нажми `Win + R`, введи `sysdm.cpl`
2. Перейди на вкладку "Дополнительно"
3. Нажми "Переменные среды"
4. В "Системные переменные" нажми "Создать":
   - Имя: `JAVA_HOME`
   - Значение: `C:\Program Files\Java\jdk-17.x.x_x`
5. Найди переменную `Path`, нажми "Изменить"
6. Добавь новую строку: `%JAVA_HOME%\bin`

### 4. Проверь установку
Перезапусти терминал и выполни:
```bash
java -version
javac -version
echo %JAVA_HOME%
```

Должны увидеть версии Java и путь к JDK.

### 5. Сборка APK
После установки Java:
```bash
npx expo prebuild --platform android
cd android
.\gradlew assembleRelease
```

## Если возникли проблемы

### "java не является внутренней или внешней командой"
- Перезапусти терминал после настройки переменных
- Проверь правильность пути в JAVA_HOME

### "Ошибка доступа"
- Запускай PowerShell от имени администратора
- Проверь права на папку Java

### Версия Java не подходит
- Удали старые версии Java
- Установи JDK 17 или новее

## Альтернативы

Если не хочешь устанавливать Java локально:
1. Используй **EAS Build** (сборка в облаке)
2. Используй **GitHub Actions** для автоматической сборки
3. Попроси другого разработчика собрать APK

## Готово!

После успешной установки Java и настройки переменных окружения, сможешь собирать APK файлы для Android.
