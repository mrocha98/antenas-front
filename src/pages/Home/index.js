import React, { useState } from 'react';
import { Ghost } from 'react-kawaii';
import { Container } from './styles';

export default function Home() {
  const [ghostMood, setGhostMood] = useState('happy');

  const handleMouseEnter = () => setGhostMood('blissful');
  const handleMouseLeave = () => setGhostMood('happy');

  return (
    <Container className="page">
      <h1>Home Page</h1>
      <div
        className="ghost"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Ghost size={240} mood={ghostMood} color="#E0E4E8" />
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sem lorem,
        consequat non dapibus sit amet, ultricies sit amet lorem. Aliquam
        interdum enim quis ligula cursus scelerisque. Nam lectus est, hendrerit
        vel ornare ornare, semper vitae libero. Nullam viverra tortor nec velit
        dignissim, non tristique sapien auctor. Ut et lacinia quam. Vivamus
        tempus mollis neque, vel tempor leo feugiat a. Ut et imperdiet purus, et
        sagittis sem. Curabitur interdum arcu id sollicitudin laoreet. Nunc
        ultricies sapien vel fermentum mollis. Vivamus tincidunt nec risus et
        imperdiet. Maecenas tempor malesuada sagittis. Aenean eu diam semper
        elit imperdiet consectetur. Cras rhoncus lacus non justo scelerisque, at
        pellentesque massa pulvinar. Nulla bibendum ut dolor sed tristique.
      </p>
      <p>
        Mauris semper euismod pretium. Duis volutpat sapien a convallis iaculis.
        Vestibulum nec purus eleifend, congue urna eget, interdum ipsum.
        Maecenas maximus vehicula quam, et scelerisque neque ultrices id. Nunc
        sodales eros a blandit volutpat. Nullam mattis sapien vel enim commodo,
        nec imperdiet nibh vehicula. Sed vel mauris ac ligula cursus hendrerit
        ut ut enim. Nam elementum magna lectus, in ultricies libero tincidunt
        nec. Sed lacinia viverra nisi a iaculis. Pellentesque sed leo libero.
        Nam ornare pretium tempus. Cras aliquam lectus et pharetra mollis.
        Mauris dictum, velit ut porta faucibus, orci metus convallis nisi, et
        lacinia dui dui at purus. Integer magna purus, dignissim et turpis eu,
        feugiat mattis orci.
      </p>
      <p>
        Fusce sed augue ut lacus cursus venenatis. Nullam ac consequat tellus.
        Suspendisse ac mi est. Nunc volutpat, sem id mollis laoreet, sapien erat
        laoreet ante, ut sodales augue nisl sit amet turpis. Curabitur a viverra
        neque. Aliquam ut porttitor lacus, in porta metus. Phasellus lacinia,
        leo id vestibulum hendrerit, justo justo consequat diam, sed euismod
        sapien tortor ut neque. Donec nisi leo, tincidunt vitae elementum nec,
        blandit ut massa.
      </p>
      <p>
        Etiam pharetra est id justo porttitor, vel fermentum tortor ultricies.
        Sed ac justo diam. Phasellus nec magna eu ex vestibulum imperdiet a sit
        amet magna. Nulla sapien sapien, laoreet sit amet varius vel, bibendum
        non odio. Cras tellus risus, pretium at erat at, laoreet eleifend justo.
        In faucibus enim quis tortor porta dictum. Fusce dapibus ac magna
        condimentum venenatis. Fusce interdum mollis consectetur. Donec varius
        lorem vel libero semper elementum. Morbi vitae consequat velit. Aenean a
        odio turpis. Vivamus lorem dui, facilisis a urna vulputate, congue
        tincidunt enim. Integer id arcu metus. Aenean volutpat ullamcorper urna
        in ullamcorper. Quisque lacinia sit amet ante sit amet varius.
        Pellentesque eget mollis odio, sit amet blandit dolor.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis
        rhoncus ipsum, ac viverra tortor. Praesent faucibus augue nec ipsum
        hendrerit, non scelerisque ipsum placerat. In hac habitasse platea
        dictumst. Quisque eget erat bibendum lectus viverra volutpat.
        Suspendisse vitae scelerisque erat. In dignissim dui volutpat augue
        malesuada imperdiet. Sed non risus consectetur mauris iaculis semper
        eget ac quam. Vivamus accumsan ac libero non consequat. Sed gravida erat
        sit amet enim elementum dictum. Nulla facilisi. Nunc nunc neque,
        sagittis eu diam fermentum, ultrices viverra tortor. Etiam gravida quam
        et urna tempor vehicula.
      </p>
      <p>
        Aenean congue volutpat quam quis commodo. Donec sit amet ex commodo,
        faucibus erat quis, suscipit lectus. Quisque vehicula id sapien eu
        rutrum. Interdum et malesuada fames ac ante ipsum primis in faucibus.
        Quisque fermentum lacinia lobortis. Vivamus vel justo ligula. Sed non
        nisl ut quam vehicula pulvinar. Cras est sapien, placerat quis arcu vel,
        scelerisque venenatis nulla. Curabitur pretium faucibus libero in
        porttitor. Mauris molestie, quam sit amet commodo iaculis, lorem magna
        pharetra elit, vitae laoreet urna magna non augue. Donec tincidunt
        faucibus cursus.
      </p>
      <p>
        Curabitur feugiat orci augue, a faucibus risus finibus in. Vestibulum
        lobortis risus accumsan erat venenatis, in mollis quam commodo. In odio
        lacus, efficitur in neque a, condimentum rutrum nibh. Ut dignissim
        elementum sem, eu aliquam velit dictum ut. Aliquam erat volutpat.
        Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris
        eleifend leo vel diam posuere, ac ullamcorper libero aliquet. Lorem
        ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse viverra
        mauris at libero varius euismod. Quisque eu tortor risus. Vestibulum
        pulvinar porta orci a posuere. In semper vehicula magna ac volutpat. Ut
        luctus sagittis turpis quis viverra. Nunc sed porta est. Vestibulum
        pretium eget nulla sed mollis.
      </p>
    </Container>
  );
}
