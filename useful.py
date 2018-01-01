import py
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import func
import sqlalchemy as sql

Base = declarative_base()

# -----------------------------------------------------------------------------
class Thought(Base):
    __tablename__ = 'thoughts'

    th_id = sql.Column(sql.Integer, primary_key=True)
    th_vetted = sql.Column(sql.Integer)
    th_text = sql.Column(sql.String)

    def __repr__(self):
        msg = "<Thought(th_id='{}', th_vetted='{}', th_text='{}')>"
        return msg.format(self.th_id, self.th_vetted, self.th_text)
            

# -----------------------------------------------------------------------------
def engine():
    if not hasattr(engine, "_eng"):
        dbname = py.path.local("useful.db")
        dbselector = "sqlite:///{}".format(dbname.strpath)
        engine._eng = sql.create_engine(dbselector)
    return engine._eng


# -----------------------------------------------------------------------------
def session():
    if not hasattr(session, "factory"):
        eng = engine()
        session.factory = sessionmaker(bind=eng)
    return session.factory()


# -----------------------------------------------------------------------------
def setup_database():
    """
    Define the database of useful thoughts
    """
    eng = engine()
    Thought.metadata.create_all(eng)


# -----------------------------------------------------------------------------
def store_thought(text):
    """
    Define the database of useful thoughts
    """
    S = session()
    present = False
    for z in S.query(Thought).filter_by(th_text=text):
        present = True
    if not present:
        S.add(Thought(th_vetted=0, th_text=text))
    S.commit()
    return not present


# -----------------------------------------------------------------------------
def random_thoughts(count):
    """
    Define the database of useful thoughts
    """
    S = session()
    rval = [x[0] for x in
            S.query(Thought.th_text).order_by(func.random()).limit(count)]
    S.commit()
    return rval
