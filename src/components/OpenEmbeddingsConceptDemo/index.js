import React, {useState, useMemo} from 'react';
import styles from './styles.module.css';

const conceptTopics = [
  {
    slug: 'turkey',
    title: 'Turkey',
    languages: '61 languages',
    angle: 'geopolitics and state identity',
    summary: 'Rare concepts inside one multilingual topic cluster become searchable English cards.',
    cards: [
      {
        label: 'Istanbul as a global city',
        text: 'Several leads emphasize Istanbul as a superlative city spanning continents, not just as a former capital or largest city.',
        languages: 'zh / ka / tr',
        sources: [
          ['zh', 'https://zh.wikipedia.org/wiki/%E5%9C%9F%E8%80%B3%E5%85%B6'],
          ['tr', 'https://tr.wikipedia.org/wiki/T%C3%BCrkiye'],
        ],
      },
      {
        label: 'Ottoman succession',
        text: 'Some leads frame modern Turkey through the collapse of the Ottoman Empire and the founding of the republic in 1923.',
        languages: 'bg / cy / pl / zh',
        sources: [
          ['pl', 'https://pl.wikipedia.org/wiki/Turcja'],
          ['zh', 'https://zh.wikipedia.org/wiki/%E5%9C%9F%E8%80%B3%E5%85%B6'],
        ],
      },
      {
        label: 'Kurdish population framing',
        text: 'Some language leads include ethnic and minority-population framing that does not appear uniformly.',
        languages: 'ar / da / ko / mk',
        sources: [
          ['ar', 'https://ar.wikipedia.org/wiki/%D8%AA%D8%B1%D9%83%D9%8A%D8%A7'],
          ['ko', 'https://ko.wikipedia.org/wiki/%ED%8A%80%EB%A5%B4%ED%82%A4%EC%98%88'],
        ],
      },
    ],
  },
  {
    slug: 'europe',
    title: 'Europe',
    languages: '61 languages',
    angle: 'definition and boundary ambiguity',
    summary: 'The best conceptual ambiguity example: geography, culture, politics, boundaries, and islands all compete.',
    cards: [
      {
        label: 'Historical-cultural construct',
        text: 'Italian frames Europe as commonly treated as a continent because of historical-cultural and geopolitical factors.',
        languages: 'it',
        sources: [['it', 'https://it.wikipedia.org/wiki/Europa']],
      },
      {
        label: 'Arbitrary category',
        text: 'Romanian explicitly says Europe can be cultural, political, or geographic.',
        languages: 'ro',
        sources: [['ro', 'https://ro.wikipedia.org/wiki/Europa']],
      },
      {
        label: 'Islands and archipelagos',
        text: 'Catalan expands the concept by naming nearby Atlantic and Mediterranean islands.',
        languages: 'ca',
        sources: [['ca', 'https://ca.wikipedia.org/wiki/Europa']],
      },
    ],
  },
  {
    slug: 'jesus',
    title: 'Jesus',
    languages: '61 languages',
    angle: 'historical figure vs theological role',
    summary: 'A useful framing topic because leads vary between historical preacher, Christian messiah, Islamic prophet, and theological incarnation.',
    cards: [
      {
        label: 'Historical preacher and Roman Judea',
        text: 'English emphasizes Jesus as a first-century Jewish preacher in the Roman province of Judaea before moving to Christian theology.',
        languages: 'en',
        sources: [['en', 'https://en.wikipedia.org/wiki/Jesus']],
      },
      {
        label: 'Prophet in Islam',
        text: 'Polish explicitly mentions Jesus as an important prophet in Islam alongside Christian messiah language.',
        languages: 'pl',
        sources: [['pl', 'https://pl.wikipedia.org/wiki/Jezus_Chrystus']],
      },
      {
        label: 'Different religious readings',
        text: 'Chinese foregrounds Jesus as Christian Son, Islamic prophet, and ordinary historical person in Judaism.',
        languages: 'zh',
        sources: [['zh', 'https://zh.wikipedia.org/wiki/%E8%80%B6%E7%A8%A3']],
      },
    ],
  },
  {
    slug: 'united_states',
    title: 'United States',
    languages: '61 languages',
    angle: 'federal structure and territorial framing',
    summary: 'The country page varies between constitutional structure, territory, population, immigration, and naming conventions.',
    cards: [
      {
        label: 'Indigenous and external territories',
        text: 'Chinese includes 326 Indian reservations and claims to offshore territories and outlying islands.',
        languages: 'zh',
        sources: [['zh', 'https://zh.wikipedia.org/wiki/%E7%BE%8E%E5%9B%BD']],
      },
      {
        label: 'Transcontinental framing',
        text: 'French emphasizes the United States as a transcontinental state, not simply a North American country.',
        languages: 'fr',
        sources: [['fr', 'https://fr.wikipedia.org/wiki/%C3%89tats-Unis']],
      },
      {
        label: 'Democratic federal republic',
        text: 'German starts with constitutional democratic-federal structure and includes territories beyond the 50 states.',
        languages: 'de',
        sources: [['de', 'https://de.wikipedia.org/wiki/Vereinigte_Staaten']],
      },
    ],
  },
  {
    slug: 'earth',
    title: 'Earth',
    languages: '10-language pass',
    angle: 'planet facts vs human world',
    summary: 'Earth leads are mostly aligned, but they differ in whether they foreground life, water, density, age, or orbital mechanics.',
    cards: [
      {
        label: 'Ocean world',
        text: 'English foregrounds Earth as an ocean world and quantifies ocean coverage at 70.8% of the crust.',
        languages: 'en',
        sources: [['en', 'https://en.wikipedia.org/wiki/Earth']],
      },
      {
        label: 'Orbital mechanics',
        text: 'Chinese includes distance, mass, radius, density, rotation, revolution, axial tilt, Moon, Trojans, and quasi-satellites.',
        languages: 'zh',
        sources: [['zh', 'https://zh.wikipedia.org/wiki/%E5%9C%B0%E7%90%83']],
      },
      {
        label: 'No other Solar System life',
        text: 'German says no other planet in the Solar System has been found to host life.',
        languages: 'de',
        sources: [['de', 'https://de.wikipedia.org/wiki/Erde']],
      },
    ],
  },
  {
    slug: 'cat',
    title: 'Cat',
    languages: '10-language pass',
    angle: 'domestication, taxonomy, and risk',
    summary: 'A lighter example: pet, predator, taxonomy, pest control, domestication history, and ecological harm.',
    cards: [
      {
        label: 'Pest control',
        text: 'Arabic explains domestication through controlling crop-damaging rodents and venomous reptiles.',
        languages: 'ar',
        sources: [['ar', 'https://ar.wikipedia.org/wiki/%D9%82%D8%B7']],
      },
      {
        label: 'Invasive species caveat',
        text: 'Polish mentions IUCN/SSC invasive-species status in many areas.',
        languages: 'pl',
        sources: [['pl', 'https://pl.wikipedia.org/wiki/Kot_domowy']],
      },
      {
        label: 'Fertile Crescent origin',
        text: 'Chinese ties cat keeping to the Fertile Crescent and ancient Egyptian grain protection.',
        languages: 'zh',
        sources: [['zh', 'https://zh.wikipedia.org/wiki/%E7%8C%AB']],
      },
    ],
  },
  {
    slug: 'dog',
    title: 'Dog',
    languages: '10-language pass',
    angle: 'companionship, work, and taxonomy',
    summary: 'Dog pages split between companion framing, wolf taxonomy, domestication timing, working roles, and environmental caveats.',
    cards: [
      {
        label: 'Best friend and work roles',
        text: 'Arabic uses the “best friend of humans” framing and lists hunting, field, shepherd, guard, and police dogs.',
        languages: 'ar',
        sources: [['ar', 'https://ar.wikipedia.org/wiki/%D9%83%D9%84%D8%A8']],
      },
      {
        label: 'Wolf boundary problem',
        text: 'German says dog and wolf are not separated by a species barrier and can produce fertile offspring.',
        languages: 'de',
        sources: [['de', 'https://de.wikipedia.org/wiki/Haushund']],
      },
      {
        label: 'Environmental impact',
        text: 'Chinese notes feral dogs may affect the environment and other organisms.',
        languages: 'zh',
        sources: [['zh', 'https://zh.wikipedia.org/wiki/%E7%8A%AC']],
      },
    ],
  },
  {
    slug: 'christianity',
    title: 'Christianity',
    languages: '10-language pass',
    angle: 'doctrine, salvation, and institutions',
    summary: 'Christianity leads differ in how much they emphasize doctrine, global scale, salvation, Trinity, or historical origin.',
    cards: [
      {
        label: 'Spiritual and social teaching',
        text: 'Arabic emphasizes New Testament spiritual, social, and ethical teaching, miracles, original sin, crucifixion, resurrection, and mediation.',
        languages: 'ar',
        sources: [['ar', 'https://ar.wikipedia.org/wiki/%D8%A7%D9%84%D9%85%D8%B3%D9%8A%D8%AD%D9%8A%D8%A9']],
      },
      {
        label: 'Trinity foregrounded',
        text: 'Japanese explicitly foregrounds Father, Son, and Holy Spirit as the one God for most Christian denominations.',
        languages: 'ja',
        sources: [['ja', 'https://ja.wikipedia.org/wiki/%E3%82%AD%E3%83%AA%E3%82%B9%E3%83%88%E6%95%99']],
      },
      {
        label: 'Judea under Rome',
        text: 'Polish places the origin in first-century Western Asia, Judea under the Roman Empire.',
        languages: 'pl',
        sources: [['pl', 'https://pl.wikipedia.org/wiki/Chrze%C5%9Bcija%C5%84stwo']],
      },
    ],
  },
  {
    slug: 'islam',
    title: 'Islam',
    languages: '10-language pass',
    angle: 'scripture, revelation, and world scale',
    summary: 'Islam leads vary between shahada, Quran, Muhammad, revelation, Gabriel, and population scale.',
    cards: [
      {
        label: 'Revelation over 23 years',
        text: 'Arabic says the Quran was revealed to Muhammad over 23 years in Mecca and Medina.',
        languages: 'ar',
        sources: [['ar', 'https://ar.wikipedia.org/wiki/%D8%A7%D9%84%D8%A5%D8%B3%D9%84%D8%A7%D9%85']],
      },
      {
        label: 'Absolute monotheism',
        text: 'French foregrounds the dogma of absolute monotheism and the Quran as God’s word revealed in seventh-century Arabia.',
        languages: 'fr',
        sources: [['fr', 'https://fr.wikipedia.org/wiki/Islam']],
      },
      {
        label: 'Gabriel and final scripture',
        text: 'Polish names Gabriel and frames the Quran as the holy book revealed to Muhammad from 610 to 632.',
        languages: 'pl',
        sources: [['pl', 'https://pl.wikipedia.org/wiki/Islam']],
      },
    ],
  },
  {
    slug: 'world_war_ii',
    title: 'World War II',
    languages: '10-language pass',
    angle: 'national framing and scale',
    summary: 'A strong national-framing topic: languages choose different war-scale facts to foreground.',
    cards: [
      {
        label: 'Named participants',
        text: 'Japanese names the central Axis and Allied countries directly in the lead.',
        languages: 'ja',
        sources: [['ja', 'https://ja.wikipedia.org/wiki/%E7%AC%AC%E4%BA%8C%E6%AC%A1%E4%B8%96%E7%95%8C%E5%A4%A7%E6%88%A6']],
      },
      {
        label: 'Old World theater',
        text: 'Polish emphasizes Eurasia, Africa, oceans, Oceania, and episodes in the Americas.',
        languages: 'pl',
        sources: [['pl', 'https://pl.wikipedia.org/wiki/II_wojna_%C5%9Bwiatowa']],
      },
      {
        label: 'Nuclear weapons and civilians',
        text: 'Russian explicitly foregrounds nuclear weapons and majority-civilian deaths.',
        languages: 'ru',
        sources: [['ru', 'https://ru.wikipedia.org/wiki/%D0%92%D1%82%D0%BE%D1%80%D0%B0%D1%8F_%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%8F_%D0%B2%D0%BE%D0%B9%D0%BD%D0%B0']],
      },
    ],
  },
];

function SourceLinks({sources}) {
  if (!sources?.length) {
    return null;
  }
  return (
    <div className={styles.sources} aria-label="Source articles">
      {sources.map(([label, href]) => (
        <a key={`${label}-${href}`} href={href} target="_blank" rel="noreferrer">
          {label}
        </a>
      ))}
    </div>
  );
}

function TopicSelect({selected, onSelect}) {
  return (
    <label className={styles.selectWrap}>
      <span>Topic</span>
      <select value={selected} onChange={(event) => onSelect(event.target.value)}>
        {conceptTopics.map((item) => (
          <option key={item.slug} value={item.slug}>
            {item.title}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function OpenEmbeddingsConceptDemo() {
  const [selected, setSelected] = useState(conceptTopics[0].slug);
  const topic = useMemo(() => conceptTopics.find((item) => item.slug === selected) ?? conceptTopics[0], [selected]);

  return (
    <div className={styles.demo}>
      <div className={styles.header}>
        <div>
          <p className={styles.kicker}>Interactive research note</p>
          <h3>Language-specific concept cards</h3>
          <p>
            Select any processed topic to see the kind of English-normalized concept layer a
            publisher could expose alongside Open Embeddings.
          </p>
        </div>
        <div className={styles.stats} aria-label="Demo corpus summary">
          <span><strong>304</strong> rows</span>
          <span><strong>8</strong> spaces</span>
          <span><strong>10</strong> topics</span>
        </div>
      </div>

      <div className={styles.controls}>
        <TopicSelect selected={selected} onSelect={setSelected} />
        <div className={styles.tabs} role="group" aria-label="Featured concept card topic shortcuts">
          {conceptTopics.slice(0, 5).map((item) => (
            <button
              key={item.slug}
              type="button"
              className={item.slug === topic.slug ? `${styles.tab} ${styles.tabActive}` : styles.tab}
              onClick={() => setSelected(item.slug)}>
              {item.title}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.topicIntro}>
        <div>
          <span className={styles.eyebrow}>{topic.languages}</span>
          <h4>{topic.title}</h4>
          <p>{topic.summary}</p>
        </div>
        <span className={styles.angle}>{topic.angle}</span>
      </div>

      <div className={styles.cards}>
        {topic.cards.map((card) => (
          <article className={styles.card} key={card.label}>
            <span>{card.languages}</span>
            <h5>{card.label}</h5>
            <p>{card.text}</p>
            <SourceLinks sources={card.sources} />
          </article>
        ))}
      </div>
    </div>
  );
}
