<?php

define("TELEGRAM_TOKEN", "2125794009:AAES8WgZDAPqsXQKIyFhd3jg6HXHXbmIm_c");
define("TELEGRAM_CHAT_ID", "-1002247097160");

$post = (!empty($_POST)) ? true : false;

if ($post) {
    $name = htmlspecialchars($_POST['Name']);
    $phone = htmlspecialchars($_POST['Tel']);
    $telegram = htmlspecialchars($_POST['Telegram']);
    $utm_source = htmlspecialchars($_POST['utm_source']);
    $utm_medium = htmlspecialchars($_POST['utm_medium']);
    $utm_campaign = htmlspecialchars($_POST['utm_campaign']);
    $utm_content = htmlspecialchars($_POST['utm_content']);
    
    // Получение ссылки, откуда была заполнена форма
    $referer = htmlspecialchars($_SERVER['HTTP_REFERER']);
    
    $error = '';

    // сообщение, которое будет отправлено в Telegram
    $text = "Новое сообщение с сайта:\n\nІм'я: $name\nТелефон: $phone\nТелеграм: $telegram\nUTM Source: $utm_source\nUTM Medium: $utm_medium\nUTM Campaign: $utm_campaign\nUTM Content: $utm_content\nСсылка, откуда была заполнена форма: $referer";

    if (!$error) {
        $url = "https://api.telegram.org/bot" . TELEGRAM_TOKEN . "/sendMessage?chat_id=" . TELEGRAM_CHAT_ID . "&text=" . urlencode($text);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($ch);
        curl_close($ch);

        if (!$error) {
            echo 'OK';
        }
    } else {
        echo '<div class="notification_error">' . $error . '</div>';
    }
}
?>
