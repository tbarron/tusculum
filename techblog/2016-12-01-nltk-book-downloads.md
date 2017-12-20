---
prev: 2016-11-24-scalability
title: Downloading the Natural Language Toolkit data
next: 2017-01-06-tools
---

I'm reading through the [NLTK book](http://www.nltk.org/book) and when I
followed the instructions for fetching the data files using the nltk
downloader, I got an SSL certificate error.

So here's what I wound up doing instead to get the data files on my
machine. I think this could be a useful technique in the future when I have
situations that call for incremental, experimental fetching and processing
of resources.

First, I got a list of the items I needed to download. I found the list by
firing up nltk in python, and running the shell downloader:

    >>> nltk.downloader.download_shell()
    NLTK Downloader
    ---------------------------------------------------------------------------
        d) Download   l) List    u) Update   c) Config   h) Help   q) Quit
    ---------------------------------------------------------------------------
    Downloader> c

    Data Server:
      - URL: <https://raw.githubusercontent.com/nltk/nltk_data/gh-pages/index.xml>
    Error connecting to server: [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed (_ssl.c:590)

    ---------------------------------------------------------------------------
        d) Download   l) List    u) Update   c) Config   h) Help   q) Quit
    ---------------------------------------------------------------------------
    Downloader>
    
You can see the certificate verification error here. But the juicy part is
that this provided the URL for fetching the index file that tells what's
available from the download server. Look at the line right above the SSL
error message.

So I used curl to retrieve that file.

    $ curl -o index.xml https://raw.githubusercontent.com/nltk/nltk_data/gh-pages/index.xml
    
One of the last things in the index file is a "collection" entry named
"Everything used in the NLTK Book". So I grabbed that list and copied it
into a "downloads-pending" file:

downloads-pending:

    abc
    brown
    chat80
    cmudict
    ...
    panlex_swadesh
    averaged_perceptron_tagger
    
I wrote quick python script (fetch.py, real original name, huh?):

fetch.py:

    import os
    import pdb
    import sys
    import xmltodict

    # -----------------------------------------------------------------------------
    def main(args):
        dlpname = 'downloads-pending'
        dldname = 'downloads-done'
        with open(dldname, 'r') as dldone:
            donelist = [_.strip() for _ in dldone.readlines()]

        with open(dlpname, 'r') as dlpend, open(dldname, 'a') as dldone:
            for line in dlpend:
                name = line.strip()
                if name in donelist:
                    print("DONE: {}".format(name))
                else:
                    print("pending: {}".format(name))
                    url = get_url(name)
                    cmd = build_curl(name, url)
                    run(cmd)
                    os.chdir('corpora')
                    if 0 == run('unzip -o {}.zip'.format(name)):
                        os.unlink('{}.zip'.format(name))
                    os.chdir('..')
                    donelist.append(name)
                    dldone.write(name + '\n')

    # -----------------------------------------------------------------------------
    def run(cmd):
        print(cmd)
        return os.system(cmd)

    # -----------------------------------------------------------------------------
    def build_curl(name, url):
        rval = "curl -o corpora/{}.zip {}".format(name, url)
        return rval

    # -----------------------------------------------------------------------------
    def get_url(name):
        try:
            doc = get_url._doc
        except AttributeError:
            with open('index.xml', 'r') as xml:
                doc = get_url._doc = xmltodict.parse(xml.read())
        for item in doc['nltk_data']['packages']['package']:
            if name == item['@id']:
                rval = item['@url']
                return rval

    # -----------------------------------------------------------------------------
    if __name__ == '__main__':
        main(sys.argv)

Of course, I'm breaking rules here, like using os.system() (*GASP*), but my
goal was to get something done quickly. To begin with, I had a
pdb.set_trace() at the top and a sys.exit() at the bottom of the for loop
in main() so that after fetching and installing a single item (and adding
the item name to downloads-done for tracking) with me stepping through the
code in the debugger, the script would stop and give me a chance to poke
around and make sure everything was going to plan.

As I got more confident that the code was doing what I wanted, I removed
the pdb.set_trace() and later the sys.exit() and just let it run.

As a result, I was able to build the script incrementally while making
progress on the task.

