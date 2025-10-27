const writeups_data = [
    {
        id: 'w1',
        source: 'Let’sDefend Platform',
        title: {
            en: 'Malware Initial Access (Case: 3224)',
            az: 'Zərərli Proqram İlkin Giriş (Keys: 3224)'
        },
        summary: {
            en: 'Analysis of a suspicious file download and execution leading to an initial access event. Covered containment and eradication steps.',
            az: 'Şübhəli faylın yüklənməsi və icrasının ilkin giriş hadisəsinə səbəb olan təhlili. Tərkibəalma və aradan qaldırma addımları əhatə olunur.'
        },
        content: {
            en: 'The case involved an alert for a high-risk file downloaded via a web browser. Upon investigation, the file was identified as a known trojan. The initial steps focused on isolating the infected host. We performed forensic analysis to determine the scope of the compromise, checked for persistence mechanisms, and ultimately wiped and re-imaged the machine. This writeup details the YARA rules used for detection.',
            az: 'Keys, veb brauzer vasitəsilə yüklənmiş yüksək riskli bir fayl üçün xəbərdarlıqla əlaqəli idi. Araşdırma zamanı faylın məlum bir troyan olduğu müəyyən edildi. İlkin addımlar yoluxmuş hostu təcrid etməyə yönəldilmişdi. Biz kompromisin həcmini müəyyən etmək üçün məhkəmə-tibb təhlili apardıq, davamlılıq mexanizmlərini yoxladıq və nəticədə maşını silib yenidən imiclədik. Bu yazı aşkarlama üçün istifadə olunan YARA qaydalarını ətraflı izah edir.'
        }
    },
    {
        id: 'w2',
        source: 'Internal SOC Case',
        title: {
            en: 'Lateral Movement via PSExec',
            az: 'PSExec vasitəsilə Yan Hərəkət'
        },
        summary: {
            en: 'An incident response summary detailing the detection and mitigation of an attacker attempting to move laterally across the network using valid credentials.',
            az: 'Şəbəkədə etibarlı etimadnamələrdən istifadə edərək yan hərəkət etməyə cəhd edən bir hücumçunun aşkarlanması və yumşaldılması barədə insidentə cavab xülasəsi.'
        },
        content: {
            en: 'Alerts showed a user logging into multiple high-value servers in quick succession, which is an anomalous behavior. We used SIEM logs to correlate the logins and identified PSExec usage from a compromised workstation. The response involved immediately disabling the compromised account, blocking the hashes, and deploying a proactive hunt query to identify any other systems accessed by the attacker.',
            az: 'Xəbərdarlıqlar bir istifadəçinin qısa müddətdə bir neçə yüksək dəyərli serverə daxil olduğunu göstərdi ki, bu da qeyri-adi bir davranışdır. Biz SIEM loqlarından istifadə edərək girişləri əlaqələndirdik və kompromisə uğramış iş stansiyasından PSExec istifadəsini müəyyən etdik. Cavab dərhal kompromisə uğramış hesabı deaktiv etməkdən, heşləri bloklamaqdan və hücumçu tərəfindən daxil olan hər hansı digər sistemləri müəyyən etmək üçün proaktiv ov sorğusu tətbiq etməkdən ibarət idi.'
        }
    }
    // Add more writeups here following the same structure
];